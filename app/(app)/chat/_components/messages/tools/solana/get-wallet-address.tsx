import React, { useEffect } from 'react'

import LoginButton from '@/app/(app)/_components/log-in-button';

import ToolCard from '../tool-card';

import { useSolanaWallets, Wallet } from '@privy-io/react-auth';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { ToolInvocation } from 'ai';
import type { GetWalletAddressResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const GetWalletAddress: React.FC<Props> = ({ tool, prevToolAgent }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Getting Wallet Address...`}   
            result={{
                heading: (result: GetWalletAddressResultType) => result.body 
                    ? `Fetched Wallet Address`
                    : "No wallet address found",
                body: (result: GetWalletAddressResultType) => result.body 
                    ? `${result.body.address}` 
                    :  "No wallet address found"
            }}
            call={{
                heading: "Connect Wallet",
                body: (toolCallId: string) => <GetWalletAddressAction toolCallId={toolCallId} />
            }}
            prevToolAgent={prevToolAgent}
        />
    )
}

const GetWalletAddressAction = ({ toolCallId }: { toolCallId: string }) => {

    const { addToolResult } = useChat();

    const { wallets } = useSolanaWallets();

    useEffect(() => {
        if(wallets.length) {
            addToolResult(toolCallId, {
                message: "Wallet connected",
                body: {
                    address: wallets[0].address
                }
            });
        }
    }, [wallets]);

    const onComplete = (wallet: Wallet) => {
        addToolResult(toolCallId, {
            message: "Wallet connected",
            body: {
                address: wallet.address
            }
        });
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <LoginButton onComplete={onComplete} />
        </div>
    )
}

export default GetWalletAddress;