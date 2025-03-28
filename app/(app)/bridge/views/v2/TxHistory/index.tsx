import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import PageHeader from '../../../components/PageHeader';
import Header, { Alignment } from '../../../components/Header';
import config from '../../../config';
import PoweredByIcon from '../../../icons/PoweredBy';
import useTransactionHistory from '../../../hooks/useTransactionHistory';
import { setRoute as setAppRoute } from '../../../store/router';
import { trimAddress } from '../../../utils';
import { joinClass } from '../../../utils/style';
import TxHistoryItem from '../../../views/v2/TxHistory/Item';

import type { RootState } from '../../../store';

const useStyles = makeStyles()(() => ({
  container: {
    margin: 'auto',
    maxWidth: '420px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  infiniteScroller: {
    height: '640px',
    overflow: 'auto',
    width: '100%',
  },
  txHistoryHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  spacer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

const TxHistory = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const theme = useTheme();

  const [page, setPage] = useState(0);

  const { transactions, isFetching, hasMore } = useTransactionHistory({
    page,
  });

  const sendingWallet = useSelector((state: RootState) => state.wallet.sending);

  const header = useMemo(() => {
    const defaults: { text: string; align: Alignment } = {
      text: '',
      align: 'left',
    };

    let headerConfig;

    if (typeof config.ui.pageHeader === 'string') {
      headerConfig = { ...defaults, text: config.ui.pageHeader };
    } else {
      headerConfig = { ...defaults, ...config.ui.pageHeader };
    }

    return <PageHeader title={headerConfig.text} align={headerConfig.align} />;
  }, []);

  // Header for Transaction History, which includes the title and settings icon
  const txHistoryHeader = useMemo(() => {
    return (
      <div className={classes.txHistoryHeader}>
        <Header align='left' size={18} text='Transaction history' />
        <IconButton onClick={() => dispatch(setAppRoute('bridge'))}>
          <SwapHorizIcon />
        </IconButton>
      </div>
    );
  }, [classes.txHistoryHeader, dispatch]);

  const transactionList = useMemo(() => {
    if (!transactions) {
      return <></>;
    } else if (transactions.length === 0) {
      return (
        <Typography color={theme.palette.text.secondary} textAlign='center'>
          {`No transactions found for the wallet ${trimAddress(
            sendingWallet.address
          )}`}
        </Typography>
      );
    }

    return (
      <div className={joinClass([classes.infiniteScroller])}>
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={(p: number) => setPage(p)}
          useWindow={false}
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className={joinClass([classes.spacer])}>
            {transactions.map((tx, idx) => {
              return <TxHistoryItem key={idx} data={tx} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }, [
    classes.infiniteScroller,
    classes.spacer,
    hasMore,
    sendingWallet.address,
    theme.palette.text.secondary,
    transactions,
  ]);

  return (
    <div className={joinClass([classes.container, classes.spacer])}>
      {header}
      {txHistoryHeader}
      {transactionList}
      {(!transactions || isFetching) && <CircularProgress />}
      <PoweredByIcon color={theme.palette.text.primary} />
    </div>
  );
};

export default TxHistory;
