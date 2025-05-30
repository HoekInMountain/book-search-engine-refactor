import jwt from 'jsonwebtoken';
import type { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

interface UserPayload {
  username: string;
  email: string;
  _id: string;
}

export function signToken({ username, email, _id }: UserPayload): string {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// This function mutates `req` and adds `user`, but we don’t force the type extension
export function authMiddleware({ req }: { req: Request }): Request {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim();
  }

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as { data: UserPayload };
    // @ts-ignore: Add user to request (safely ignored if Express doesn't define it)
    req.user = data;
  } catch (err) {
    console.warn('Invalid token');
  }

  return req;
}
