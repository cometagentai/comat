'use client'

import React from 'react'

import { SidebarMenu as SidebarMenuUI } from '@/components/ui';

import ChatsGroup from './chats-group';
import AccountButton from './account-button';
import PortfolioButton from './portfolio-button';
import HomeButton from './home-button';
import TransactionButton from './transaction';

const SidebarMenu: React.FC = () => {
    return (
        <SidebarMenuUI>
            <HomeButton />
            <ChatsGroup />
            <AccountButton />
            <PortfolioButton />
            <TransactionButton />
        </SidebarMenuUI>
    )
}

export default SidebarMenu;