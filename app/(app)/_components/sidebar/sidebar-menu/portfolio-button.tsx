'use client';

import React from 'react';

import { Bank } from 'iconsax-react';
import { ColorMode, useColorMode } from '@/app/_contexts';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import { usePrivy } from '@privy-io/react-auth';

const PortfolioButton: React.FC = () => {
  const pathname = usePathname();

  const { user } = usePrivy();
  const { mode } = useColorMode();
  if (!user?.wallet?.address) return null;

  return (
    <Link href={`/portfolio/${user.wallet.address}`}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/portfolio') ?? false}>
          <h1 className='flex font-semibold items-center gap-2'>
            <Bank
              size='24'
              color={mode === ColorMode.DARK ? '#FFFFFF' : '#1E1E1E'}
              variant='Outline'
              className='mr-[3px]'
            />
            Portfolio
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default PortfolioButton;
