'use client';

import React, { useEffect } from 'react';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginButton: React.FC = () => {
  const router = useRouter();

  const { authenticated } = usePrivy();

  useEffect(() => {
    if (!authenticated) {
      login();
    }
  }, [authenticated]);

  const { login } = useLogin({
    onComplete: (_, __, wasAlreadyAuthenticated) => {
      if (!wasAlreadyAuthenticated) {
        router.replace('/chat');
      }
    },
  });

  if (authenticated)
    return (
      <Link href='/chat'>
        <Button variant={'default'}>Get Start</Button>
      </Link>
    );

  return (
    <>
      <Button
        variant={'default'}
        onClick={() => login()}
        disabled={authenticated}
      >
        Get Start
      </Button>
      <Button
        className='sm:absolute relative sm:right-[15px] right-[0px] sm:top-[11px] top-[0px]'
        variant={'default'}
        onClick={() => login()}
        disabled={authenticated}
      >
        Connect
      </Button>
    </>
  );
};

export default LoginButton;
