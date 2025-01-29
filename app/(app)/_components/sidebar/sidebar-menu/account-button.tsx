'use client';

import React from 'react';

import { UserSquare } from 'iconsax-react';
import { ColorMode, useColorMode } from '@/app/_contexts';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';

const AccountButton: React.FC = () => {
  const pathname = usePathname();
  const { mode } = useColorMode();
  return (
    <Link href='/account'>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/account') ?? false}>
          <h1 className='flex items-center gap-2 font-carlito'>
            <UserSquare
              size='24'
              color={mode === ColorMode.DARK ? '#FFFFFF' : '#1E1E1E'}
              variant='Outline'
              className='mr-[3px]'
            />
            Account
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default AccountButton;
