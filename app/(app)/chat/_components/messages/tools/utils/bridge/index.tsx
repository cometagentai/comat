'use client';

import React from 'react';
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
    </div>
  );
};

export default BridgeTool;
