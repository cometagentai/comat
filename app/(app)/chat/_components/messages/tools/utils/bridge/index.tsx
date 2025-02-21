'use client';

import React, { useContext, useEffect } from 'react';
import type { Token } from '@/db/types';
import Bridge from '@/app/(app)/bridge/views/v2/Bridge';
import { RouteContext } from '@/app/(app)/bridge/context/RouteContext';
import { useExternalSearch } from '@/app/(app)/bridge/hooks/useExternalSearch';
import { RootState } from '@/app/(app)/bridge/store';
import { clearRedeem, setRoute } from '@/app/(app)/bridge/store/redeem';
import { clearTransfer } from '@/app/(app)/bridge/store/transferInput';
import { clearWallets } from '@/app/(app)/bridge/store/wallet';
import { usePrevious } from '@/app/(app)/bridge/utils';
import Terms from '@/app/(app)/bridge/views/Terms';
import TxSearch from '@/app/(app)/bridge/views/TxSearch';
import TxHistory from '@/app/(app)/bridge/views/v2/TxHistory';
import RedeemV2 from '@/app/(app)/bridge/views/v2/Redeem';

import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const routeContext = useContext(RouteContext);

  const route = useSelector((state: RootState) => state.router.route);
  const prevRoute = usePrevious(route);
  const { hasExternalSearch } = useExternalSearch();

  useEffect(() => {
    const redeemRoute = 'redeem';
    const bridgeRoute = 'bridge';
    // reset redeem state on leave
    if (prevRoute === redeemRoute && route !== redeemRoute) {
      dispatch(clearRedeem());
      dispatch(clearWallets());
      routeContext.clear();
      config.whLegacy.registerProviders(); // reset providers that may have been set during transfer
    }
    // reset transfer state on leave
    const isEnteringBridge = route === bridgeRoute && prevRoute !== bridgeRoute;
    if (isEnteringBridge && prevRoute !== 'history') {
      dispatch(clearTransfer());
    }
  }, [route, prevRoute, dispatch]);

  useEffect(() => {
    if (hasExternalSearch) {
      dispatch(clearRedeem());
      dispatch(setRoute('search'));
    }
  }, [hasExternalSearch, dispatch]);

  return (
    <div className='flex flex-col gap-4 w-96 max-w-full'>
      {route === 'bridge' && (
        <Bridge
          inputAmount={initialInputAmount || '0'}
          onCancel={onCancel || (() => {})}
        />
      )}
      {route === 'redeem' && <RedeemV2 />}
      {route === 'search' && <TxSearch />}
      {route === 'history' && <TxHistory />}
      {route === 'terms' && <Terms />}
    </div>
  );
};

export default BridgeTool;
