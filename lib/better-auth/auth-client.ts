import { createAuthClient } from 'better-auth/client';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseURL) {
  throw new Error('Missing NEXT_PUBLIC_BASE_URL');
}

export const authClient = createAuthClient({ baseURL });
