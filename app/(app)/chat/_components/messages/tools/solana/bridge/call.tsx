'use client';

import React from 'react';

import { Card, Skeleton } from '@/components/ui';

import { useTokenDataByAddress } from '@/hooks';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { SolanaTradeArgumentsType, SolanaTradeResultBodyType } from '@/ai';

import BridgeTool from '../../utils/bridge';

interface Props {
  toolCallId: string;
  args: SolanaTradeArgumentsType;
}

const BridgeCallBody: React.FC<Props> = ({ toolCallId, args }) => {
  const { addToolResult } = useChat();

  const { data: inputTokenData, isLoading: inputTokenLoading } =
    useTokenDataByAddress(args.inputMint || '');
  const { data: outputTokenData, isLoading: outputTokenLoading } =
    useTokenDataByAddress(args.outputMint || '');

  return (
    <Card className='p-2'>
      {inputTokenLoading || outputTokenLoading ? (
        <Skeleton className='h-48 w-96' />
      ) : (
        <BridgeTool
          initialInputToken={inputTokenData}
          initialOutputToken={outputTokenData}
          inputLabel='From'
          outputLabel='To'
          initialInputAmount={args.inputAmount?.toString()}
          swapText='Bridge'
          swappingText='Bridging...'
          onSuccess={(tx) => {
            addToolResult<SolanaTradeResultBodyType>(toolCallId, {
              message: `Bridge Transaction successful!`,

              body: {
                transaction: tx,
                inputAmount: args.inputAmount || 0,
                inputToken: inputTokenData?.symbol || '',
                outputToken: outputTokenData?.symbol || '',
              },
            });
          }}
          onError={(error) => {
            addToolResult(toolCallId, {
              message: `Bridge Transaction failed: ${error}`,
            });
          }}
          onCancel={() => {
            addToolResult(toolCallId, {
              message: `Bridge Transaction cancelled`,
            });
          }}
        />
      )}
    </Card>
  );
};

export default BridgeCallBody;
