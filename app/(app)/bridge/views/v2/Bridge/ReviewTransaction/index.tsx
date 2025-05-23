import React, { useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { useMediaQuery, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { getTransferDetails } from '../../../../telemetry';
import { Context } from '../../../../sdklegacy';

import Button from '../../../../components/v2/Button';
import config from '../../../../config';
import { addTxToLocalStorage } from '../../../../utils/inProgressTxCache';
import { RoutesConfig } from '../../../../config/routes';
import { RouteContext } from '../../../../context/RouteContext';
import { useGasSlider } from '../../../../hooks/useGasSlider';
import {
  setTxDetails,
  setSendTx,
  setRoute as setRedeemRoute,
  setTimestamp,
} from '../../../../store/redeem';
import { setRoute as setAppRoute } from '../../../../store/router';
import {
  setAmount,
  setIsTransactionInProgress,
} from '../../../../store/transferInput';
import { getWrappedToken } from '../../../../utils';
import { interpretTransferError } from '../../../../utils/errors';
import {
  validate,
  isTransferValid,
} from '../../../../utils/transferValidation';
import {
  registerWalletSigner,
  switchChain,
  TransferWallet,
} from '../../../../utils/wallet';
import GasSlider from '../../../../views/v2/Bridge/ReviewTransaction/GasSlider';
import SingleRoute from '../../../../views/v2/Bridge/Routes/SingleRoute';

import type { RootState } from '../../../../store';
import { RelayerFee } from '../../../../store/relay';

import { amount as sdkAmount } from '@wormhole-foundation/sdk';
import { toDecimals } from '../../../../utils/balance';
import { useUSDamountGetter } from '../../../../hooks/useUSDamountGetter';
import SendError from './SendError';
import { ERR_USER_REJECTED } from '../../../../telemetry/types';
import { useGetTokens } from '../../../../hooks/useGetTokens';

const useStyles = makeStyles()(() => ({
  container: {
    gap: '16px',
    width: '100%',
    maxWidth: '420px',
  },
  confirmTransaction: {
    padding: '8px 16px',
    borderRadius: '8px',
    margin: 'auto',
    maxWidth: '420px',
    width: '100%',
  },
}));

type Props = {
  onClose: () => void;
  quotes: any;
  isFetchingQuotes: boolean;
};

const ReviewTransaction = (props: Props) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [sendError, setSendError] = useState<string | undefined>(undefined);
  const [sendErrorInternal, setSendErrorInternal] = useState<any | undefined>(
    undefined
  );

  const routeContext = useContext(RouteContext);

  const transferInput = useSelector((state: RootState) => state.transferInput);

  const {
    amount,
    fromChain: sourceChain,
    toChain: destChain,
    isTransactionInProgress,
    route,
    validations,
  } = transferInput;

  const wallet = useSelector((state: RootState) => state.wallet);
  const { sending: sendingWallet, receiving: receivingWallet } = wallet;

  const relay = useSelector((state: RootState) => state.relay);
  const { toNativeToken } = relay;

  const getUSDAmount = useUSDamountGetter();

  const { sourceToken, destToken } = useGetTokens();

  const { disabled: isGasSliderDisabled, showGasSlider } = useGasSlider({
    destChain,
    destToken: destToken!.key,
    route,
    valid: true,
    isTransactionInProgress,
  });

  const quoteResult = props.quotes[route ?? ''];
  const quote = quoteResult?.success ? quoteResult : undefined;

  const receiveNativeAmount = quote?.destinationNativeGas;

  const send = async () => {
    setSendError(undefined);

    if (config.ui.previewMode) {
      setSendError('Connect is in preview mode');
      return;
    }

    // Pre-check of required values
    if (
      !sourceChain ||
      !sourceToken ||
      !destChain ||
      !destToken ||
      !amount ||
      !route ||
      !quote
    ) {
      return;
    }

    await validate({ transferInput, relay, wallet }, dispatch, () => false);

    const valid = isTransferValid(validations);

    if (!valid || !route) {
      return;
    }

    const transferDetails = getTransferDetails(
      route,
      sourceToken,
      destToken,
      sourceChain,
      destChain,
      amount,
      getUSDAmount
    );

    // Handle custom transfer validation (if provided by integrator)
    if (config.validateTransfer) {
      try {
        const { isValid, error } = await config.validateTransfer({
          ...transferDetails,
          fromWalletAddress: sendingWallet.address,
          toWalletAddress: receivingWallet.address,
        });
        if (!isValid) {
          setSendError(error ?? 'Transfer validation failed');
          return;
        }
      } catch (e) {
        setSendError('Error validating transfer');
        setSendErrorInternal(e);
        console.error(e);
        return;
      }
    }

    dispatch(setIsTransactionInProgress(true));

    try {
      const fromConfig = config.chains[sourceChain!];

      if (fromConfig?.context === Context.ETH) {
        const chainId = fromConfig.chainId;

        if (typeof chainId !== 'number') {
          throw new Error('Invalid EVM chain ID');
        }

        await switchChain(chainId, TransferWallet.SENDING);
        await registerWalletSigner(sourceChain, TransferWallet.SENDING);
      }

      config.triggerEvent({
        type: 'transfer.initiate',
        details: transferDetails,
      });

      const [sdkRoute, receipt] = await config.routes
        .get(route)
        .send(
          sourceToken,
          amount,
          sourceChain,
          sendingWallet.address,
          destChain,
          receivingWallet.address,
          destToken,
          { nativeGas: toNativeToken }
        );

      const txId =
        'originTxs' in receipt
          ? receipt.originTxs[receipt.originTxs.length - 1].txid
          : undefined;

      config.triggerEvent({
        type: 'transfer.start',
        details: { ...transferDetails, txId },
      });

      if (!txId) throw new Error("Can't find txid in receipt");

      let relayerFee: RelayerFee | undefined = undefined;
      if (quote.relayFee) {
        const { token, amount } = quote.relayFee;
        const feeToken = config.tokens.get(token);

        const formattedFee = Number.parseFloat(
          toDecimals(amount.amount, amount.decimals, 6)
        );

        relayerFee = {
          fee: formattedFee,
          token: feeToken?.tuple,
        };
      }

      const txTimestamp = Date.now();
      const txDetails = {
        sendTx: txId,
        sender: sendingWallet.address,
        amount,
        recipient: receivingWallet.address,
        toChain: receipt.to,
        fromChain: receipt.from,
        tokenAddress: getWrappedToken(sourceToken).tokenId!.address.toString(),
        token: sourceToken.tuple,
        tokenDecimals: sourceToken.decimals,
        receivedToken: destToken.tuple, // TODO: possibly wrong (e..g if portico swap fails)
        relayerFee,
        receiveAmount: quote.destinationToken.amount,
        receiveNativeAmount,
        eta: quote.eta || 0,
      };

      // Add the new transaction to local storage
      addTxToLocalStorage({
        txDetails,
        txHash: txId,
        timestamp: txTimestamp,
        receipt,
        route,
      });

      // Set the start time of the transaction
      dispatch(setTimestamp(txTimestamp));

      // TODO: SDKV2 set the tx details using on-chain data
      // because they might be different than what we have in memory (relayer fee)
      // or we may not have all the data (e.g. block)
      // TODO: we don't need all of these details
      // The SDK should provide a way to get the details from the chain (e.g. route.lookupSourceTxDetails)
      dispatch(setTxDetails(txDetails));

      // Reset the amount for a successful transaction
      dispatch(setAmount(''));

      routeContext.setRoute(sdkRoute);
      routeContext.setReceipt(receipt);

      dispatch(setSendTx(txId));
      dispatch(setRedeemRoute(route));
      dispatch(setAppRoute('redeem'));
      setSendError(undefined);
    } catch (e: any) {
      const [uiError, transferError] = interpretTransferError(
        e,
        transferDetails
      );

      if (transferError.type === ERR_USER_REJECTED) {
        // User intentionally rejected in their wallet. This is not an error in the sense
        // that something went wrong.
      } else {
        console.error('Wormhole Connect: error completing transfer', e);

        // Show error in UI
        setSendError(uiError);
        setSendErrorInternal(e);

        // Trigger transfer error event to integrator
        config.triggerEvent({
          type: 'transfer.error',
          error: transferError,
          details: transferDetails,
        });
      }
    } finally {
      dispatch(setIsTransactionInProgress(false));
    }
  };

  const walletsConnected = useMemo(
    () => !!sendingWallet.address && !!receivingWallet.address,
    [sendingWallet.address, receivingWallet.address]
  );

  // Review transaction button is shown only when everything is ready
  const confirmTransactionButton = useMemo(() => {
    if (
      !sourceChain ||
      !sourceToken ||
      !destChain ||
      !destToken ||
      !route ||
      !amount
    ) {
      return null;
    }

    return (
      <Button
        disabled={props.isFetchingQuotes || isTransactionInProgress}
        variant='primary'
        className={classes.confirmTransaction}
        onClick={() => send()}
      >
        {isTransactionInProgress ? (
          <Typography
            display='flex'
            alignItems='center'
            gap={1}
            textTransform='none'
          >
            <CircularProgress
              size={16}
              sx={{ color: theme.palette.primary.contrastText }}
            />
            {mobile ? 'Preparing' : 'Preparing transaction'}
          </Typography>
        ) : !isTransactionInProgress && props.isFetchingQuotes ? (
          <Typography
            display='flex'
            alignItems='center'
            gap={1}
            textTransform='none'
          >
            <CircularProgress color='secondary' size={16} />
            {mobile ? 'Refreshing' : 'Refreshing quote'}
          </Typography>
        ) : (
          <Typography textTransform='none'>
            {mobile ? 'Confirm' : 'Confirm transaction'}
          </Typography>
        )}
      </Button>
    );
  }, [
    props.isFetchingQuotes,
    isTransactionInProgress,
    sourceChain,
    sourceToken,
    destChain,
    destToken,
    route,
    amount,
    send,
  ]);

  if (!route || !walletsConnected) {
    return <></>;
  }

  return (
    <Stack className={classes.container}>
      <div>
        <IconButton
          disabled={isTransactionInProgress}
          sx={{ padding: 0 }}
          onClick={() => props.onClose?.()}
        >
          <ChevronLeft sx={{ fontSize: '32px', color: 'black' }} />
        </IconButton>
      </div>
      <SingleRoute
        route={RoutesConfig[route]}
        isSelected={false}
        destinationGasDrop={receiveNativeAmount}
        quote={quote}
      />
      {showGasSlider && (
        <Collapse in={showGasSlider}>
          <GasSlider
            destinationGasDrop={
              receiveNativeAmount || sdkAmount.fromBaseUnits(BigInt(0), 8)
            }
            disabled={isGasSliderDisabled}
          />
        </Collapse>
      )}
      <SendError humanError={sendError} internalError={sendErrorInternal} />
      {confirmTransactionButton}
    </Stack>
  );
};

export default ReviewTransaction;
