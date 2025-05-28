import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import db from './config/connection';
import routes from './routes/index';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware } from './utils/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Helper function to start both Apollo + Express
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Existing REST routes (optional to keep)
  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
