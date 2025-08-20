'use client';

import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, signOut } from '@/store/slices/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

export default function ProfileViewPage() {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  return (
    <div className='flex w-full justify-center p-6'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='flex flex-col items-center gap-2'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src={user?.imageUrl || ''} />
            <AvatarFallback>
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <CardTitle className='text-xl font-semibold'>
            {user?.fullName || 'Your Name'}
          </CardTitle>
          <p className='text-muted-foreground text-sm'>
            {user?.email || 'you@example.com'}
          </p>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Profile Info */}
          <div>
            <Label>Name</Label>
            <Input
              defaultValue={user?.fullName || ''}
              placeholder='Enter your name'
              className='mt-1'
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              defaultValue={user?.email}
              placeholder='Enter your email'
              className='mt-1'
              disabled
            />
          </div>

          {/* Security Section */}
          <div>
            <h3 className='mb-2 text-lg font-medium'>Security</h3>
            <Button variant='outline' className='w-full'>
              Change Password
            </Button>
          </div>

          {/* Session Section */}
          <div>
            <h3 className='mb-2 text-lg font-medium'>Active Session</h3>
            <p className='text-muted-foreground text-sm'>
              You are currently logged in on this device.
            </p>
            <Button
              variant='destructive'
              className='bg-primary mt-2 w-full'
              onClick={() => dispatch(signOut())}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
