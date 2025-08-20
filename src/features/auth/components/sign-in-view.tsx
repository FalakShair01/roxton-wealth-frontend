'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthStatus, selectAuthError, signIn } from '@/store/slices/auth';
import type { AppDispatch } from '@/store';
import { redirect } from 'next/navigation';

export default function SignInViewPage() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(signIn({ email, password })).unwrap();
      // router.push('/dashboard/client');
      alert('Login successful');
      router.replace('/dashboard/client');
    } catch (err: any) {
      // setError(err.errors?.[0]?.message || 'Login failed');
    }
  };

  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='relative flex flex-col justify-center px-8 py-12 lg:px-24'>
        <div className='text-md text-muted-foreground absolute top-10 right-10'>
          Don’t have an account?{' '}
          <Link href='/auth/sign-up' className='text-primary font-medium'>
            Register
          </Link>
        </div>

        <div className='mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='text-center'>
            <h1 className='mt-6 text-4xl'>Login to your account</h1>
            <p className='text-muted-foreground mt-2 text-sm'>
              Please enter your details to login.
            </p>
          </div>

          {/* <Button variant='outline' className='h-10 w-full bg-gray-100'>
            Continue with Google
          </Button>

          <div className='flex h-6 w-full items-center gap-4'>
            <div className='bg-border h-px flex-1' />
            <span className='text-muted-foreground text-sm'>
              Or continue with
            </span>
            <div className='bg-border h-px flex-1' />
          </div> */}
          <form className='w-full space-y-6' onSubmit={handleLogin}>
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                className='mt-2 h-10 w-full text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>

            <div className='text-right'>
              <Link
                href='/auth/forget-password'
                className='text-primary text-sm hover:underline'
              >
                Forgot your password?
              </Link>
            </div>

            {error && <p className='text-sm text-red-500'>{error}</p>}

            <Button type='submit' className='bg-primary h-10 w-full'>
              Login
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
