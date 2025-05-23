import React, { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { makeStyles } from 'tss-react/mui';

import config from '@/app/(app)/bridge/config';
import { RouteContext } from '@/app/(app)/bridge/context/RouteContext';
import AssetBadge from '@/app/(app)/bridge/components/AssetBadge';
import {
  calculateUSDPrice,
  millisToHumanString,
  trimAddress,
  trimTxHash,
} from '@/app/(app)/bridge/utils';
import { getExplorerInfo } from '@/app/(app)/bridge/utils/sdkv2';
import { amount as sdkAmount } from '@wormhole-foundation/sdk';

import type { RootState } from '@/app/(app)/bridge/store';
import { toFixedDecimals } from '@/app/(app)/bridge/utils/balance';
import { useTokens } from '@/app/(app)/bridge/context/TokensContext';

const useStyles = makeStyles()(() => ({
  container: {
    width: '100%',
    maxWidth: '420px',
  },
  card: {
    width: '100%',
  },
}));

const TransactionDetails = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const routeContext = React.useContext(RouteContext);

  const {
    sendTx,
    sender,
    amount,
    recipient,
    toChain,
    fromChain,
    token,
    receivedToken,
    receiveAmount,
    receiveNativeAmount,
    relayerFee,
    eta,
  } = useSelector((state: RootState) => state.redeem.txData)!;

  const { route: routeName } = useSelector((state: RootState) => state.redeem);

  const sourceToken = config.tokens.get(token);
  const destToken = config.tokens.get(receivedToken);

  const { getTokenPrice, isFetchingTokenPrices, lastTokenPriceUpdate } =
    useTokens();

  // Separator with a unicode dot in the middle
  const separator = useMemo(
    () => (
      <Typography component='span' padding='0px 8px'>{`\u00B7`}</Typography>
    ),
    []
  );

  // Render details for the sent amount
  const sentAmount = useMemo(() => {
    if (!sourceToken || !fromChain) {
      return <></>;
    }

    const sourceTokenConfig = config.tokens.get(token);
    const sourceChainConfig = config.chains[fromChain]!;

    const usdAmount = calculateUSDPrice(
      getTokenPrice,
      amount,
      sourceTokenConfig
    );

    const senderAddress = sender ? trimAddress(sender) : '';

    const formattedAmount = sdkAmount.display(sdkAmount.truncate(amount, 6));

    return (
      <Stack alignItems='center' direction='row' justifyContent='flex-start'>
        <AssetBadge chainConfig={sourceChainConfig} token={sourceTokenConfig} />
        <Stack direction='column' marginLeft='12px'>
          <Typography fontSize={16}>
            {formattedAmount} {sourceToken.symbol}
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize={14}>
            {isFetchingTokenPrices ? (
              <CircularProgress size={14} />
            ) : (
              <>
                {usdAmount}
                {usdAmount ? separator : null}
                {sourceChainConfig.displayName}
                {separator}
                {senderAddress}
              </>
            )}
          </Typography>
        </Stack>
      </Stack>
    );
  }, [
    sourceToken,
    fromChain,
    token,
    getTokenPrice,
    amount,
    sender,
    theme.palette.text.secondary,
    isFetchingTokenPrices,
    separator,
  ]);

  // Render details for the received amount
  const receivedAmount = useMemo(() => {
    if (!destToken || !toChain) {
      return <></>;
    }

    const destChainConfig = config.chains[toChain]!;

    const usdAmount = calculateUSDPrice(
      getTokenPrice,
      receiveAmount,
      destToken
    );

    const recipientAddress = recipient ? trimAddress(recipient) : '';

    const formattedReceiveAmount = receiveAmount
      ? sdkAmount.display(sdkAmount.truncate(receiveAmount, 6))
      : '-';

    return (
      <Stack alignItems='center' direction='row' justifyContent='flex-start'>
        <AssetBadge chainConfig={destChainConfig} token={destToken} />
        <Stack direction='column' marginLeft='12px'>
          <Typography fontSize={16}>
            {formattedReceiveAmount} {destToken!.symbol}
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize={14}>
            {isFetchingTokenPrices ? (
              <CircularProgress size={14} />
            ) : (
              <>
                {usdAmount}
                {usdAmount ? separator : null}
                {destChainConfig.displayName}
                {separator}
                {recipientAddress}
              </>
            )}
          </Typography>
        </Stack>
      </Stack>
    );
    // ESLint complains that lastTokenPriceUpdate is unused/unnecessary here, but that's wrong.
    // We want to recompute the price after we update conversion rates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    destToken,
    getTokenPrice,
    receiveAmount,
    recipient,
    separator,
    theme.palette.text.secondary,
    toChain,
    isFetchingTokenPrices,
    lastTokenPriceUpdate,
  ]);

  // Vertical line that connects sender and receiver token icons
  const verticalConnector = useMemo(
    () => (
      <Stack
        height='28px'
        borderLeft='1px solid #8B919D'
        marginLeft='16px'
      ></Stack>
    ),
    []
  );

  const bridgeFee = useMemo(() => {
    if (!relayerFee || !relayerFee.token) {
      return <></>;
    }

    const feeTokenConfig = config.tokens.get(relayerFee.token);
    if (!feeTokenConfig) {
      return <></>;
    }

    const feePrice = calculateUSDPrice(
      getTokenPrice,
      relayerFee.fee,
      feeTokenConfig
    );

    if (!feePrice) {
      return <></>;
    }

    let feeValue = (
      <Typography fontSize={14}>{`${toFixedDecimals(
        relayerFee.fee.toString(),
        4
      )} ${feeTokenConfig.symbol} (${feePrice})`}</Typography>
    );

    // Special request: For Mayan we show the USD amount only
    if (routeName?.startsWith('MayanSwap')) {
      feeValue = <Typography fontSize={14}>{feePrice}</Typography>;
    }

    return (
      <Stack direction='row' justifyContent='space-between'>
        <Typography color={theme.palette.text.secondary} fontSize={14}>
          Network cost
        </Typography>
        {isFetchingTokenPrices ? <CircularProgress size={14} /> : feeValue}
      </Stack>
    );
  }, [
    relayerFee,
    getTokenPrice,
    routeName,
    theme.palette.text.secondary,
    isFetchingTokenPrices,
  ]);

  const destinationGas = useMemo(() => {
    if (
      !receivedToken ||
      !receiveNativeAmount ||
      sdkAmount.units(receiveNativeAmount) === BigInt(0)
    ) {
      return <></>;
    }

    const destChainConfig = config.chains[toChain];

    if (!destChainConfig) {
      return <></>;
    }

    const gasTokenPrice = calculateUSDPrice(
      getTokenPrice,
      receiveNativeAmount,
      config.tokens.getGasToken(destChainConfig.sdkName)
    );

    return (
      <Stack direction='row' justifyContent='space-between'>
        <Typography color={theme.palette.text.secondary} fontSize={14}>
          Additional gas
        </Typography>
        {isFetchingTokenPrices ? (
          <CircularProgress size={14} />
        ) : (
          <Typography fontSize={14}>{gasTokenPrice}</Typography>
        )}
      </Stack>
    );
    // ESLint complains that lastTokenPriceUpdate is unused/unnecessary here, but that's wrong.
    // We want to recompute the price after we update conversion rates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    receiveNativeAmount,
    theme.palette.text.secondary,
    toChain,
    isFetchingTokenPrices,
    lastTokenPriceUpdate,
  ]);

  const explorerLink = useMemo(() => {
    // Fallback to routeName if RouteContext value is not available
    const route = routeContext.route ?? routeName;

    if (!route) {
      return null;
    }

    // Get explorer name and url for the route
    const { name, url } = getExplorerInfo(route, sendTx);

    return (
      <Stack alignItems='center' padding='24px 12px'>
        <Link
          display='flex'
          gap='8px'
          href={url}
          rel='noreferrer'
          target='_blank'
          underline='none'
        >
          <Typography
            color={theme.palette.text.primary}
            fontSize={14}
          >{`View on ${name}`}</Typography>
        </Link>
      </Stack>
    );
  }, [routeContext.route, routeName, sendTx, theme.palette.text.primary]);

  const timeToDestination = useMemo(() => {
    let etaDisplay: string | ReactNode = <CircularProgress size={14} />;

    if (!eta) return null;

    etaDisplay = millisToHumanString(eta);

    return (
      <Stack direction='row' justifyContent='space-between'>
        <Typography color={theme.palette.text.secondary} fontSize={14}>
          {`Time to ${toChain}`}
        </Typography>
        <Typography fontSize={14}>{etaDisplay}</Typography>
      </Stack>
    );
  }, [eta, theme.palette.text.secondary, toChain]);

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            color={theme.palette.text.secondary}
            marginBottom='12px'
          >{`Transaction #${trimTxHash(sendTx)}`}</Typography>
          {sentAmount}
          {verticalConnector}
          {receivedAmount}
          <Stack
            direction='column'
            gap='8px'
            justifyContent='space-between'
            marginTop='16px'
          >
            {bridgeFee}
            {destinationGas}
            {timeToDestination}
          </Stack>
        </CardContent>
        <Divider flexItem sx={{ margin: '0 16px', opacity: '50%' }} />
        {explorerLink}
      </Card>
    </div>
  );
};

export default TransactionDetails;
