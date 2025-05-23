import { useCallback, useEffect, useState } from 'react';
import {
  Chain,
  ChainId,
  chainIdToChain,
  TokenId,
  toNative,
} from '@wormhole-foundation/sdk';

import config from '../config';

import type { Transaction } from '../config/types';

interface MayanTransaction {
  trader: string;
  destAddress: string;
  sourceTxHash: string;
  sourceChain: ChainId;
  swapChain: string;
  destChain: ChainId;
  fromAmount: string;
  fromTokenChain: ChainId;
  fromTokenAddress: string;
  fromTokenPrice: number;
  toTokenPrice: number;
  toTokenAddress: string;
  toTokenChain: ChainId;
  status: string;
  clientStatus: string;
  initiatedAt: string;
  toAmount: string;
  statusUpdatedAt: string;
}

type Props = {
  address: string;
  page?: number;
  pageSize?: number;
};

const useTransactionHistoryMayan = (
  props: Props
): {
  transactions: Array<Transaction> | undefined;
  error: string;
  isFetching: boolean;
  hasMore: boolean;
} => {
  const [transactions, setTransactions] = useState<
    Array<Transaction> | undefined
  >();
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { address, page = 0, pageSize = 30 } = props;

  const parseSingleTx = (tx: MayanTransaction) => {
    const {
      fromAmount,
      sourceChain,
      destChain,
      fromTokenPrice,
      fromTokenAddress,
      initiatedAt,
      toAmount,
      toTokenAddress,
      sourceTxHash,
      trader,
      destAddress,
      clientStatus,
    } = tx;

    const fromChain = chainIdToChain(sourceChain);
    const toChain = chainIdToChain(destChain);

    // Skip this transaction if we don't have source or destination chains
    if (!fromChain || !toChain) {
      return;
    }

    let fromToken, toToken;

    try {
      fromToken = config.tokens.get(
        parseMayanAddress(fromChain, fromTokenAddress)
      );
      toToken = config.tokens.get(parseMayanAddress(toChain, toTokenAddress));
    } catch (e) {
      console.error(e);
      return undefined;
    }

    // Skip this transaction if we can't find source or destination token configs
    if (!fromToken || !toToken) {
      console.error('Cant find tokenz');
      return;
    }

    // Transaction is in progress when it's not completed or refunded
    const clientStatusLC = clientStatus?.toLowerCase();
    const inProgress =
      clientStatusLC !== 'completed' && clientStatusLC !== 'refunded';

    const txData: Transaction = {
      txHash: sourceTxHash,
      sender: trader,
      amount: fromAmount,
      amountUsd: Number(fromAmount) * fromTokenPrice,
      recipient: destAddress,
      fromChain,
      fromToken,
      toChain,
      toToken,
      receiveAmount: toAmount,
      senderTimestamp: initiatedAt,
      explorerLink: `https://explorer.mayan.finance/swap/${sourceTxHash}`,
      inProgress,
    };

    return txData;
  };

  const parseTransactions = useCallback(
    (allTxs: Array<MayanTransaction>) =>
      allTxs.map((tx) => parseSingleTx(tx)).filter((tx) => !!tx), // Filter out unsupported transactions
    []
  );

  useEffect(() => {
    let cancelled = false;

    const fetchTransactions = async () => {
      setIsFetching(true);

      const limit = pageSize;
      const offset = limit * page;

      try {
        const res = await fetch(
          `${config.mayanApi}/v3/swaps?trader=${address}&offset=${offset}&limit=${limit}`
        );

        // If the fetch was unsuccessful, return an empty set
        if (res.status !== 200) {
          setTransactions([]);
          setHasMore(false);
          setIsFetching(false);
        } else {
          const resPayload = await res.json();

          if (!cancelled) {
            const resData = resPayload?.data;

            if (resData) {
              setTransactions((txs) => {
                const parsedTxs = parseTransactions(resData);

                if (txs && txs.length > 0) {
                  // We need to keep track of existing tx hashes to prevent duplicates in the final list
                  const existingTxs = new Set<string>();
                  txs.forEach((tx: Transaction) => {
                    if (tx?.txHash) {
                      existingTxs.add(tx.txHash);
                    }
                  });

                  // Add the new set transactions while filtering out duplicates
                  return txs.concat(
                    parsedTxs.filter(
                      (tx: Transaction) => !existingTxs.has(tx.txHash)
                    )
                  );
                }
                return parsedTxs;
              });
            }

            if (resData?.length < limit) {
              setHasMore(false);
            }
          }
        }
      } catch (error) {
        if (!cancelled) {
          setHasMore(false);
          setError(`Error fetching transaction history from Mayan: ${error}`);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchTransactions();

    return () => {
      cancelled = true;
    };
  }, [address, page, pageSize, parseTransactions]);

  return {
    transactions,
    error,
    isFetching,
    hasMore,
  };
};

function parseMayanAddress<C extends Chain>(chain: C, addr: string): TokenId {
  if (addr === '0x0000000000000000000000000000000000000000') {
    return { chain, address: 'native' };
  }
  const corrected = toNative(chain, addr);
  return { chain, address: corrected };
}

export default useTransactionHistoryMayan;
