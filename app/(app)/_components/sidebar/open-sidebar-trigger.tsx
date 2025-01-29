'use client'

import React from 'react'

import { SidebarTrigger, useSidebar } from '@/components/ui';

const OpenSidebarTrigger: React.FC = () => {

    const { isMobile, open } = useSidebar();
    
    if (isMobile || !open) return null;

    return (
        <SidebarTrigger />
    )
}

export default OpenSidebarTrigger;