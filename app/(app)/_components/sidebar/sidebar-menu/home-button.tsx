'use client';

import React from 'react';

import Link from 'next/link';
import { Home2 } from 'iconsax-react';
import { usePathname } from 'next/navigation';
import { useColorMode } from '@/app/_contexts';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
import { HomeIcon } from 'lucide-react';

const HomeButton: React.FC = () => {
  const { mode } = useColorMode();
  const pathname = usePathname();

  return (
    <Link href='/'>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/home') ?? false}>
          <h1 className='flex items-center gap-2 font-carlito'>
            <HomeIcon className='mr-[3px]' />
            Home
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default HomeButton;
