'use client';

import React, { useEffect } from 'react';
import type { Token } from '@/db/types';
import Bridge from '@/app/(app)/bridge/views/v2/Bridge';
import config from '@/app/(app)/bridge/config';

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
  useEffect(() => {
    config.whLegacy.registerProviders(); // reset providers that may have been set during transfer
  }, []);

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
