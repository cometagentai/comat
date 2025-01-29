'use client';

import React from 'react';

import Link from 'next/link';
import { Home2 } from 'iconsax-react';
import { usePathname } from 'next/navigation';
import { ColorMode, useColorMode } from '@/app/_contexts';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';

const HomeButton: React.FC = () => {
  const { mode } = useColorMode();
  const pathname = usePathname();

  return (
    <Link href='/'>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/home') ?? false}>
          <h1 className='flex items-center gap-2 font-carlito'>
            <Home2
              size='24'
              color={mode === ColorMode.DARK ? '#FFFFFF' : '#1E1E1E'}
              variant='Outline'
              className='mr-[3px]'
            />
            Home
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default HomeButton;
