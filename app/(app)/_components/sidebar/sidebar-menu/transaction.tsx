'use client'

import React from 'react'

import { BadgeDollarSign } from 'lucide-react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';

const TransactionButton: React.FC = () => {

    const pathname = usePathname();

    return (
        <Link href='/'>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    isActive={pathname?.includes('/home') ?? false}
                >
                    <h1 className="flex items-center gap-2 font-normal font-carlito">
                        <BadgeDollarSign className="h-4 w-4" />
                        Transaction
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    )
}

export default TransactionButton;