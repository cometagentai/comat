import React from 'react';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const Logo: React.FC<Props> = ({
  className,
  showText = false,
  textClassName,
}) => {
  return (
    <div className='flex items-center gap-2'>
      {/* <Image 
                src="/logo.png" 
                alt="Logo" 
                width={100} 
                height={100} 
                className={cn("w-10 h-10 hidden dark:block", className)} 
            />
            <Image 
                src="/logo.png" 
                alt="Logo" 
                width={100} 
                height={100} 
                className={cn("w-10 h-10 block dark:hidden", className)} 
            /> */}
      <Image
        src='/logo.png'
        alt='Logo'
        width={120}
        height={44}
        className={cn(' hidden dark:block max-w-[100%] h-auto', className)}
      />
      <Image
        src='/logo-light-v.png'
        alt='Logo'
        width={120}
        height={44}
        className={cn(' block dark:hidden max-w-[100%] h-auto', className)}
      />
      {showText && (
        <div className={cn('text-lg font-bold', textClassName)}></div>
      )}
    </div>
  );
};

export default Logo;
