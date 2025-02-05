'use client';

import React from 'react';

// import dynamic from 'next/dynamic';

// import { ChevronDown } from 'lucide-react';

// import { VersionedTransaction } from '@solana/web3.js';

// import Decimal from 'decimal.js';

// import { Button, Separator } from '@/components/ui';

// import LogInButton from '@/app/(app)/_components/log-in-button';

// import TokenInput from './token-input';

// import { useSendTransaction, useTokenBalance } from '@/hooks';

// import { getSwapObj, getQuote } from '@/services/jupiter';

// import type { QuoteResponse } from '@jup-ag/api';
import type { Token } from '@/db/types';
import Bridge from '@/app/(app)/bridge/views/v2/Bridge';

interface Props {
  initialInputToken: Token | null;
  initialOutputToken: Token | null;
  inputLabel: string;
  outputLabel: string;
  initialInputAmount?: string;
  swapText?: string;
  swappingText?: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

const BridgeTool: React.FC<Props> = ({
  // initialInputToken,
  // initialOutputToken,
  // inputLabel,
  // outputLabel,
  initialInputAmount,
  // swapText,
  // swappingText,
  // onSuccess,
  // onError,
  onCancel,
}) => {
  return (
    <div className='flex flex-col gap-4 w-96 max-w-full'>
      <Bridge
        inputAmount={initialInputAmount || '0'}
        onCancel={onCancel || (() => {})}
      />
      {/* <div className='flex flex-col gap-2 items-center w-full'>
        <TokenInput
          label={inputLabel}

          amount={inputAmount}
          onChange={setInputAmount}
          token={inputToken}
          onChangeToken={setInputToken}
          address={wallet?.address}
        />
        <Button
          variant='ghost'
          size='icon'
          className='group h-fit w-fit p-1'
          onClick={onChangeInputOutput}
        >
          <ChevronDown className='h-4 w-4 transition-transform group-hover:rotate-180' />
        </Button>
        <TokenInput
          label={outputLabel}
          amount={outputAmount}
          token={outputToken}
          onChangeToken={setOutputToken}
          address={wallet?.address}
        />
      </div>
      <Separator />
      <div className='flex flex-col gap-2'>
        {wallet ? (
          <Button
            variant='default'
            className='w-full'
            onClick={onSwap}
            disabled={
              isSwapping ||
              isQuoteLoading ||
              !quoteResponse ||
              !inputToken ||
              !outputToken ||
              !inputAmount ||
              !outputAmount ||
              !inputBalance ||
              inputBalanceLoading ||
              Number(inputAmount) > Number(inputBalance)
            }
          >
            {isQuoteLoading
              ? 'Loading...'
              : Number(inputAmount) > Number(inputBalance)
              ? 'Insufficient balance'
              : isSwapping
              ? swappingText || 'Swapping...'
              : swapText || 'Swap'}
          </Button>
        ) : (
          <LogInButton />
        )}
        {onCancel && (
          <Button variant='ghost' className='w-full' onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default BridgeTool;
