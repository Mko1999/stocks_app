'use server';

import { headers } from 'next/headers';
import { auth } from '../better-auth/auth';
import { inngest } from '../inngest/client';

export const signupWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth?.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });

    // Check if response indicates failure
    if (!response) {
      return { success: false, error: 'Failed to create account' };
    }

    // Check if response has an error property
    if ('error' in response && response.error) {
      const errorMessage =
        typeof response.error === 'object' && 'message' in response.error
          ? String(response.error.message)
          : 'This email address is already registered. Please try signing in instead.';
      return { success: false, error: errorMessage };
    }

    if (response) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    return { success: true, data: response };
  } catch (error) {
    console.error('Signup error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create account';
    return { success: false, error: errorMessage };
  }
};

export const signinWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth?.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    // Check if response indicates failure
    if (!response) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Check if response has an error property
    if ('error' in response && response.error) {
      const errorMessage =
        typeof response.error === 'object' && 'message' in response.error
          ? String(response.error.message)
          : 'Invalid email or password';
      return { success: false, error: errorMessage };
    }

    return { success: true, data: response };
  } catch (error) {
    console.error('Signin error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Invalid email or password';
    return { success: false, error: errorMessage };
  }
};

export const signOut = async () => {
  try {
    await auth?.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error('Signout error:', error);
    return { success: false, error: 'Signout failed' };
  }
};
