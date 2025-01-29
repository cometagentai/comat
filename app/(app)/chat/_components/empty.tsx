'use client';

import React from 'react';

import ChatInput from './input';
import StarterButtons from './starter-buttons';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

const EmptyChat: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        // Base
        'flex flex-col items-center justify-center w-full h-full px-4'
      )}
    >
      <div className='flex flex-col items-center justify-center w-full max-w-full gap-4 md:gap-8'>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={274}
            height={95}
            className={cn(' hidden dark:block', className)}
          />
          <Image
            src='/logo-light-v.png'
            alt='Logo'
            width={274}
            height={95}
            className={cn(' block dark:hidden', className)}
          />
          <div className='flex flex-col gap-1'>
            <p className='text-center text-[18px] font-normal text-[#171717] dark:text-white mt-0 mb-3'>
              Organize a network of DeFi agents to operate in the crypto space.
            </p>
          </div>
        </div>
        <StarterButtons />
        <ChatInput />
      </div>
    </div>
  );
};

export default EmptyChat;
