'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui';
import { HomeIcon } from 'lucide-react';
import { useChat } from '@/app/(app)/chat/_contexts/chat';

const HomeButton: React.FC = () => {
  const pathname = usePathname();
  const { resetChat } = useChat();
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <Link
      href='/chat'
      onClick={() => {
        resetChat();
        if (isMobile) {
          setOpenMobile(false);
        }
      }}
    >
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
