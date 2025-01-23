'use client'

import React from 'react'

import { Card, Skeleton } from '@/components/ui';

import Swap from '../../utils/swap';

import { useTokenDataByAddress } from '@/hooks';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { SolanaTradeArgumentsType } from '@/ai';

interface Props {
    toolCallId: string,
    args: SolanaTradeArgumentsType,
}

const SwapCallBody: React.FC<Props> = ({ toolCallId, args }) => {

    const { addToolResult } = useChat();

    const { data: inputTokenData, isLoading: inputTokenLoading } = useTokenDataByAddress(args.inputMint || "");
    const { data: outputTokenData, isLoading: outputTokenLoading } = useTokenDataByAddress(args.outputMint || "");
    
    return (
        <Card className="p-2">
            {
                inputTokenLoading || outputTokenLoading ? (
                    <Skeleton className="h-48 w-96" />
                ) : (
                    <Swap
                        initialInputToken={inputTokenData}
                        initialOutputToken={outputTokenData}
                        inputLabel="Sell"
                        outputLabel="Buy"
                        initialInputAmount={args.inputAmount?.toString()}
                        swapText="Swap"
                        swappingText="Swapping..."
                        onSuccess={(tx) => {
                            addToolResult(toolCallId, {
                                message: `Swap successful!`,
                                body: {
                                    tx
                                }
                            });
                        }}
                        onError={(error) => {
                            addToolResult(toolCallId, {
                                message: `Swap failed: ${error}`,
                            });
                        }}
                        onCancel={() => {
                            addToolResult(toolCallId, {
                                message: `Swap cancelled`,
                            });
                        }}
                    />
                )
            }
        </Card>
    )
}

export default SwapCallBody;