import React from 'react';

import Link from 'next/link';

import { FaXTwitter } from 'react-icons/fa6';

import {
  Sidebar as SidebarUI,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarMenu as SidebarMenuUI,
} from '@/components/ui';

import AuthButton from './auth-button';
import Logo from './logo';
import SidebarMenu from './sidebar-menu';

import OpenSidebarTrigger from './open-sidebar-trigger';
import ClosedSidebarTrigger from './closed-sidebar-trigger';
import ColorModeToggle from './color-mode-toggle';
import MobileNavbar from './mobile-navbar';

interface Props {
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SidebarUI variant='inset' collapsible='icon'>
        <SidebarHeader>
          <div className='flex items-center justify-between'>
            <Logo />
            <div className='flex items-center gap-2 mt-[25px]'>
              <OpenSidebarTrigger />
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent className='relative'>
          <SidebarMenu />
        </SidebarContent>
        {/* <SidebarSeparator /> */}
        <SidebarFooter>
          <SidebarMenuUI>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                variant='outline'
                className='max-w-[135px] justify-center rounded-[35px] h-[48px] border-[#11457033] border-[1px]'
              >
                <Link
                  href={'https://x.com/cometagent_ai'}
                  target={'_blank'}
                  className='font-bold font-carlito'
                >
                  <FaXTwitter />
                  <span className='truncate'>Twitter</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* <SidebarMenuItem>
                            <SidebarMenuButton 
                                asChild 
                            >
                                <Link 
                                    href={"https://discord.gg/8TVcFvySWG"} 
                                    target={'_blank'}
                                >
                                    <FaDiscord />
                                    <span className='truncate'>Join Discord</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem> */}
          </SidebarMenuUI>
        </SidebarFooter>
      </SidebarUI>
      <SidebarInset>
        <div className='p-2 pt-0 md:p-4 flex-1 h-0 overflow-y-hidden relative flex flex-col'>
          <div className='fixed top-[15px] right-[15px] md:top-[40px] md:right-[40px] z-[100] flex items-center gap-3'>
            <ColorModeToggle />
            <AuthButton />
          </div>
          <ClosedSidebarTrigger />
          <MobileNavbar />
          {children}
        </div>
      </SidebarInset>
    </>
  );
};

export default Sidebar;
