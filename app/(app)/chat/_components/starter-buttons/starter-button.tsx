'use client';

import React from 'react';

import { Button, IconSax } from '@/components/ui';

import { useChat } from '../../_contexts/chat';

import { cn } from '@/lib/utils';

import { IconSaxName } from '@/types';

interface Props {
  icon: IconSaxName;
  title: string;
  description: string;
  prompt: string;
  className?: string;
}

const StarterButton: React.FC<Props> = ({
  icon,
  title,
  description,
  prompt,
  className,
}) => {
  const { sendMessage } = useChat();

  return (
    <Button
      className={cn(
        'flex items-center gap-2 bg-[#F6F8FA] dark:bg-[#292828] border-none h-fit justify-start p-[15px] lg:p-[24px] rounded-[20px] whitespace-normal hover:bg-[#eef1f5]',
        className
      )}
      variant='outline'
      onClick={() => sendMessage(prompt)}
    >
      <div className='flex flex-col'>
        <div className='bg-white dark:bg-[#4e4e4e] rounded-[4px] p-[4px] w-[32px] h-[32px] flex items-center justify-center'>
          <IconSax name={icon} className='w-[24px] h-[24px]' />
        </div>
        <p className='text-[16px] lg:text-[18px] text-[#1E1E1E] dark:text-white font-semibold text-left mt-1 mb-1 font-arimo'>
          {title}
        </p>
        <p className='text-[12px] lg:text-[14px] text-[#1E1E1E] dark:text-white font-normal hidden md:block font-carlito max-w-[130px] text-left min-h-[42px]'>
          {description}
        </p>
      </div>
    </Button>
  );
};

export default StarterButton;
