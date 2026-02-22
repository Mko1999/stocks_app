import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { connectToDatabase } from '../../database/mongoose';
import { nextCookies } from 'better-auth/next-js';
import { sendVerificationEmail } from '../email/mailer';

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
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: false,
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: false,
      sendVerificationEmail: async ({ user, url }) => {
        const verificationUrl = new URL(url);
        verificationUrl.searchParams.set('callbackURL', '/sign-in');
        await sendVerificationEmail(user.email, verificationUrl.toString());
      },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      },
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
