'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpViewPage({ stars }: { stars: number }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: email,
        password
      });

      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        alert('Registration successful! Redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        setError('Please verify your email.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Registration failed');
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

        <div className='mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='text-center'>
            <h1 className='mt-6 text-4xl'>Create your account</h1>
            <p className='text-muted-foreground mt-2 text-sm'>
              Please enter your details to register.
            </p>
          </div>

          <Button variant='outline' className='h-10 w-100 bg-gray-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
              fill='currentColor'
              className='mr-2 h-4 w-4'
            >
              <path d='M488 261.8c0-17.8-1.6-35-4.7-51.8H249v98h135.7c-5.9 31.8-23.6 58.7-50.1 76.6v63h80.9c47.3-43.5 74.5-107.7 74.5-185.8zM249 492c67 0 123.2-22.1 164.3-60l-80.9-63c-22.5 15.2-51.3 24.2-83.4 24.2-63.9 0-118-43.2-137.4-101.3H28.1v63.5C69.6 439 152.9 492 249 492zM111.6 295.9c-6.4-19.1-10-39.5-10-60.4s3.6-41.3 10-60.4v-63.5H28.1C10.1 152.5 0 199.5 0 235.5s10.1 83 28.1 123.9l83.5-63.5zM249 104.2c35.9 0 68.3 12.4 93.7 36.5l70.1-70.1C370.5 31.5 314.6 8 249 8 152.9 8 69.6 61 28.1 147.1l83.5 63.5C131 147.4 185.1 104.2 249 104.2z' />
            </svg>
            Continue with Google
          </Button>

          <div className='flex h-6 w-100 items-center gap-4'>
            <div className='bg-border h-px flex-1' />
            <span className='text-muted-foreground text-sm'>
              Or continue with
            </span>
            <div className='bg-border h-px flex-1' />
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

            <div>
              <Label htmlFor='confirm'>Confirm Password</Label>
              <Input
                id='confirm'
                type='password'
                placeholder='••••••••'
                className='mt-2 h-10 w-full text-sm'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className='text-sm text-red-500'>{error}</p>}

            <Button type='submit' className='h-10 w-full bg-black'>
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
