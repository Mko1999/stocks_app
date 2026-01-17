'use client';

import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import LoadingOverlay from '@/components/LoadingOverlay';
import { signinWithEmail } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signinWithEmail(data);

      if (response.success) {
        router.push('/');
      } else {
        toast.error('Sign in failed', {
          description:
            response.error ?? 'Invalid email or password. Please try again.',
        });
      }
    } catch (error) {
      toast.error('Signin failed.', {
        description:
          error instanceof Error ? error.message : 'Failed to signin.',
      });
      console.error(error);
    }
  };
  return (
    <div className="relative">
      <LoadingOverlay isLoading={isSubmitting} message="Signing in..." />
      <h1 className="form-title">Log in to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="email"
          label="Email"
          placeholder="john.doe@example.com"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email address is not valid',
            },
          }}
        />

        <InputField
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          Log in
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      </form>
    </div>
  );
};

export default SignIn;
