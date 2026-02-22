'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/better-auth/auth-client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast.error('Email address not found. Please sign up again.');
      return;
    }
    setResending(true);
    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: '/sign-in',
      });
      toast.success('Verification email sent', {
        description: 'Please check your inbox.',
      });
    } catch {
      toast.error('Failed to resend email', {
        description: 'Please try again.',
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="form-title">Check your inbox</h1>
      <p className="text-muted-foreground text-sm">
        We sent a verification link to{' '}
        {email ? (
          <span className="font-medium text-foreground">{email}</span>
        ) : (
          'your email address'
        )}
        . Click the link to activate your account.
      </p>
      <p className="text-muted-foreground text-sm">
        Didn&apos;t receive it?{' '}
        <Button
          variant="link"
          className="h-auto p-0 text-sm"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? 'Sending…' : 'Resend email'}
        </Button>
      </p>
      <Link
        href="/sign-in"
        className="text-sm text-muted-foreground hover:text-foreground underline w-fit"
      >
        Back to sign in
      </Link>
    </div>
  );
};

export default VerifyEmail;
