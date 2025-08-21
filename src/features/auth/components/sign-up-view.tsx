'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectAuthStatus, selectAuthError, signUp } from '@/store/slices/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function SignUpViewPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const errorMessage = useAppSelector(selectAuthError);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // const result = await signUp.create({
      //   email,
      //   password
      // });

      // if (result.status === 'complete' && result.createdSessionId) {
      //   await setActive({ session: result.createdSessionId });
      //   alert('Registration successful! Redirecting to dashboard...');
      //   router.push('/dashboard');
      // } else {
      //   setError('Unexpected state. Please try again.');
      // }
      await dispatch(signUp({ email, password })).unwrap();
      router.push('/dashboard/client');
    } catch (err: any) {
      setError(
        err?.errors?.[0]?.message || err?.message || 'Registration failed'
      );
    }
  };

  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='relative flex flex-col justify-center px-8 py-12 lg:px-24'>
        <div className='text-md text-muted-foreground absolute top-10 right-10'>
          Already have an account?{' '}
          <Link href='/auth/sign-in' className='text-primary font-medium'>
            Login
          </Link>
        </div>

        <div className='w/full mx-auto flex max-w-md flex-col items-center justify-center space-y-6'>
          <div className='text-center'>
            <h1 className='mt-6 text-4xl'>Create your account</h1>
            <p className='text-muted-foreground mt-2 text-sm'>
              Please enter your details to register.
            </p>
          </div>

          <form className='w-100 space-y-6' onSubmit={handleRegister}>
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                className='mt-2 h-10 w-full text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
              />
            </div>

            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                className='mt-2 h-10 w-full text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='new-password'
              />
            </div>

            <div>
              <Label htmlFor='confirm'>Confirm Password</Label>
              <Input
                id='confirm'
                type='password'
                placeholder='••••••••'
                className='mt-2 h-10 w-full text-sm'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='new-password'
              />
            </div>

            {error ||
              (errorMessage && (
                <p className='text-sm text-red-500'>{error || errorMessage}</p>
              ))}

            <Button type='submit' className='bg-primary h-10 w-full'>
              Register
            </Button>
          </form>
        </div>

        <footer className='text-muted-foreground absolute bottom-8 left-8 text-xs'>
          © 2025, Studio Admin.
        </footer>
      </div>

      <div className='m-4 hidden flex-col justify-between rounded-2xl bg-black p-8 text-white shadow-md lg:flex'>
        <div>
          <h2 className='text-lg font-semibold'>Studio Admin</h2>
          <p className='text-sm text-gray-400'>
            Design. Build. Launch. Repeat.
          </p>
        </div>
        <div className='text-muted mt-8 flex justify-between gap-6 text-xs'>
          <div>
            <p className='font-semibold text-white'>Ready to launch?</p>
            <p className='text-gray-400'>
              Clone the repo, install dependencies, and your dashboard is live
              in minutes.
            </p>
          </div>
          <div>
            <p className='font-semibold text-white'>Need help?</p>
            <p className='text-gray-400'>
              Check out the docs or open an issue on GitHub, community support
              is just a click away.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
