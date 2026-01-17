import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { connectToDatabase } from '../../database/mongoose';
import { nextCookies } from 'better-auth/next-js';

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) {
    return authInstance;
  }

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) throw new Error('Could not connect to database');

  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL;
  if (!secret || !baseURL) {
    throw new Error('Missing BETTER_AUTH_SECRET or BETTER_AUTH_URL');
  }

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    secret,
    baseURL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
