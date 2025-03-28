import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { useDebounce } from 'use-debounce';

import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { amount } from '@wormhole-foundation/sdk';

import config from '../../../../config';
import { calculateUSDPrice } from '../../../../utils';
import { RootState } from '../../../../store';
import { setToNativeToken } from '../../../../store/relay';
import { useTokens } from '../../../../context/TokensContext';

const useStyles = makeStyles()(() => ({
  card: {
    width: '100%',
    cursor: 'pointer',
    maxWidth: '420px',
    overflow: 'visible',
    padding: '0 4px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  amounts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

type SliderProps = {
  baseColor: string;
  railColor: string;
};

const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop) =>
    !['baseColor', 'railColor'].includes(prop.toString()),
})<SliderProps>(({ baseColor, railColor, theme }) => ({
  color: baseColor,
  height: 8,
  '& .MuiSlider-rail': {
    height: '8px',
    backgroundColor: railColor,
    opacity: 0.1,
  },
  '& .MuiSlider-track': {
    height: '8px',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: '9px 12px',
  right: `-12px`, // reposition towards right to negate switch padding
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSwitch-track': {
    height: '20px',
    borderRadius: '9px',
  },
}));

const GasSlider = (props: {
  destinationGasDrop: amount.Amount;
  disabled: boolean;
}) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { toChain: destChain } = useSelector(
    (state: RootState) => state.transferInput
  );

  const { getTokenPrice, isFetchingTokenPrices } = useTokens();

  const destChainConfig = config.chains[destChain!];
  const nativeGasToken = config.tokens.getGasToken(destChain!);

  const [isGasSliderOpen, setIsGasSliderOpen] = useState(!props.disabled);
  const [percentage, setPercentage] = useState(0);

  const [debouncedPercentage] = useDebounce(percentage, 500);

  useEffect(() => {
    dispatch(setToNativeToken(debouncedPercentage / 100));
  }, [debouncedPercentage]);

  const nativeGasPrice = useMemo(() => {
    if (!destChain || !nativeGasToken) {
      return null;
    }

    const tokenAmount = amount.display(
      amount.truncate(props.destinationGasDrop, 6)
    );

    const tokenPrice = calculateUSDPrice(
      getTokenPrice,
      props.destinationGasDrop,
      nativeGasToken
    );

    return (
      <Typography fontSize={14}>
        {`${tokenAmount} ${nativeGasToken.symbol} ${tokenPrice}`}
      </Typography>
    );
  }, [
    nativeGasToken,
    isFetchingTokenPrices,
    props.destinationGasDrop,
    destChain,
  ]);

  // Checking required values
  if (!destChainConfig || !nativeGasToken) {
    return <></>;
  }

  return (
    <Card className={classes.card} variant='elevation'>
      <CardContent>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography>{`Need more gas on ${destChain}?`}</Typography>
          <StyledSwitch
            checked={isGasSliderOpen}
            onClick={(e: any) => {
              const { checked } = e.target;

              setIsGasSliderOpen(checked);

              if (!checked) {
                setPercentage(0);
                dispatch(setToNativeToken(0));
              }
            }}
          />
        </Stack>
        <Collapse in={isGasSliderOpen} unmountOnExit>
          <div className={classes.container}>
            <Typography color={theme.palette.text.secondary} fontSize={14}>
              {`Use the slider to buy extra ${nativeGasToken.symbol} for future transactions.`}
            </Typography>
            <div>
              <StyledSlider
                aria-label='Native gas conversion amount'
                defaultValue={0}
                value={percentage}
                baseColor={theme.palette.primary.main}
                railColor={theme.palette.background.default}
                step={1}
                min={0}
                max={100}
                valueLabelFormat={() => `${percentage}%`}
                valueLabelDisplay='auto'
                onChange={(e: any) => setPercentage(e.target.value)}
              />
              <div className={classes.amounts}>
                <Typography color={theme.palette.text.secondary} fontSize={14}>
                  Additional gas
                </Typography>
                <Typography color={theme.palette.text.secondary} fontSize={14}>
                  {nativeGasPrice}
                </Typography>
              </div>
            </div>
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default GasSlider;
