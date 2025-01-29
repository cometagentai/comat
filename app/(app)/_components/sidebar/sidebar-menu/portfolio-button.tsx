'use client';

import React from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import { usePrivy } from '@privy-io/react-auth';
import { Landmark } from 'lucide-react';

const PortfolioButton: React.FC = () => {
  const pathname = usePathname();

  const { user } = usePrivy();

  if (!user?.wallet?.address) return null;

  return (
    <Link href={`/portfolio/${user.wallet.address}`}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/portfolio') ?? false}>
          <h1 className='flex font-semibold items-center gap-2'>
            <Landmark className='h-4 w-4' />
            Portfolio
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default PortfolioButton;
