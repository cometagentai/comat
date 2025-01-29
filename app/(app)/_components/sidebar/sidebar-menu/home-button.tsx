'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import { HomeIcon } from 'lucide-react';

const HomeButton: React.FC = () => {
  const pathname = usePathname();

  return (
    <Link href='/'>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/home') ?? false}>
          <h1 className='flex items-center font-semibold gap-2 font-carlito'>
            <HomeIcon className='mr-[3px]' />
            Home
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default HomeButton;
