'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectIsSignedIn, selectAuthLoaded } from '@/store/slices/auth';

export default function Page() {
  const router = useRouter();
  const loaded = useSelector(selectAuthLoaded);
  const signedIn = useSelector(selectIsSignedIn);
  console.log('Auth loaded:', loaded, 'Signed in:', signedIn);

  useEffect(() => {
    if (!loaded) return;
    router.replace(signedIn ? '/dashboard/client' : '/auth/sign-in');
  }, [loaded, signedIn, router]);

  return null;
}
