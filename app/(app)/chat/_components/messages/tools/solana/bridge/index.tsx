import React from 'react';

import ToolCard from '../../tool-card';

import SwapCard from './swap-result';
import BridgeCallBody from './call';

import type { ToolInvocation } from 'ai';
import type { SolanaTradeResultType, SolanaTradeArgumentsType } from '@/ai';

interface SwapProps {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Bridge: React.FC<SwapProps> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText='Completing Trade...'
      result={{
        heading: (result: SolanaTradeResultType) =>
          result.body ? 'Trade Complete' : 'Failed to complete trade',
        body: (result: SolanaTradeResultType) =>
          result.body ? <SwapCard /> : result.message,
      }}
      call={{
        heading: 'Bridge',
        body: (toolCallId: string, args: SolanaTradeArgumentsType) => (
          <BridgeCallBody toolCallId={toolCallId} args={args} />
        ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className='max-w-full'
    />
  );
};

export default Bridge;
