'use client';

import { useMemo, useState } from 'react';
import config from './config';
import { useTokens } from './context/TokensContext';
import { useGetTokens } from './hooks/useGetTokens';
import useComputeSourceTokens from './hooks/useComputeSourceTokens';
import type { Chain } from '@wormhole-foundation/sdk';
import useComputeDestinationTokens from './hooks/useComputeDestinationTokens';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import {
  selectFromChain,
  selectToChain,
  setToken,
  setTransferRoute,
  setDestToken,
} from './store/transferInput';
import { Token } from './config/tokens';
import AssetPicker from './views/v2/Bridge/AssetPicker';

export default function Home() {
  const sourceChain = 'Solana';
  const destChain = 'Ethereum';
  const { lastTokenCacheUpdate } = useTokens();
  const dispatch = useDispatch();

  const supportedChains = useMemo(
    () => config.routes.allSupportedChains(),
    [config.chainsArr]
  );

  const sourceTokens = useMemo(() => {
    if (sourceChain) {
      return config.tokens.getAllForChain(sourceChain);
    } else {
      return [];
    }
  }, [sourceChain, lastTokenCacheUpdate]);

  // Connected wallets, if any
  const { sending: sendingWallet, receiving: receivingWallet } = useSelector(
    (state: RootState) => state.wallet
  );

  // Supported chains for the source network
  const supportedSourceChains = useMemo(() => {
    return config.chainsArr.filter((chain: any) => {
      return (
        chain.key !== destChain &&
        !chain.disabledAsSource &&
        supportedChains.includes(chain.key)
      );
    });
  }, [config.chainsArr, destChain, supportedChains]);

  const [selectedRoute, setSelectedRoute] = useState<string>();
  const [willReviewTransaction, setWillReviewTransaction] = useState(false);

  const { sourceToken, destToken } = useGetTokens();

  // Compute and set source tokens
  const { isFetching: isFetchingSupportedSourceTokens } =
    useComputeSourceTokens({
      sourceChain,
      destChain,
      sourceToken,
      destToken,
      route: selectedRoute,
    });

  // Compute and set destination tokens
  const { isFetching: isFetchingSupportedDestTokens, supportedDestTokens } =
    useComputeDestinationTokens({
      sourceChain,
      destChain,
      sourceToken,
      route: selectedRoute,
    });

  return (
    <div className='flex-1 h-0 overflow-y-hidden w-full'>
      <AssetPicker
        chain={sourceChain}
        chainList={supportedSourceChains}
        token={sourceToken}
        tokenList={sourceTokens}
        isFetching={
          sourceTokens.length === 0 && isFetchingSupportedSourceTokens
        }
        setChain={(value: Chain) => {
          selectFromChain(dispatch, value, sendingWallet);
        }}
        setToken={(value: Token) => {
          dispatch(setToken(value.tuple));
        }}
        wallet={sendingWallet}
        isSource={true}
      />
    </div>
  );
}
