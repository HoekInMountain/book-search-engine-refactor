import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User';
import { signToken } from '../utils/auth';
// import type { BookInput } from './typeDefs'; // Optional: define BookInput in a typeDefs.ts

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: { user: any }) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return await User.findById(context.user._id);
    },
  },

  Mutation: {
    addUser: async (_parent: unknown, args: any) => {
      const user = await User.create(args);
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString()
      });
      return { token, user };
    },
    
    login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString()
      });
      return { token, user };
    },

    saveBook: async (
      _parent: unknown,
      { book }: { book: any },
      context: { user: any }
    ) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: book } },
        { new: true }
      );
      return updatedUser;
    },

    removeBook: async (
      _parent: unknown,
      { bookId }: { bookId: string },
      context: { user: any }
    ) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

export default resolvers;
