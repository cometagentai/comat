import { Chain, amount as sdkAmount } from '@wormhole-foundation/sdk';
import { WormholeConnectConfig } from '../config/types';
import { TransferWallet } from '../utils/wallet';

export interface LoadEvent {
  type: 'load';
  config?: WormholeConnectConfig;
}

export interface TransferDetails {
  route: string;
  fromToken: TokenDetails;
  toToken: TokenDetails;
  fromChain: Chain;
  toChain: Chain;
  txId?: string;
  USDAmount?: number;
  amount?: sdkAmount.Amount;
}

export type TransferEventType =
  | 'transfer.initiate'
  | 'transfer.start'
  | 'transfer.success'
  | 'transfer.refunded'
  | 'transfer.redeem.initiate'
  | 'transfer.redeem.start'
  | 'transfer.redeem.success';

export interface TransferEvent {
  type: TransferEventType;
  details: TransferDetails;
}

export interface TransferErrorEvent {
  type: 'transfer.error' | 'transfer.redeem.error';
  details: TransferDetails;
  error: TransferError;
}

export interface TransferError {
  type: TransferErrorType;
  original: any;
}

export interface TokenDetails {
  symbol: string;
  tokenId:
    | {
        address: string;
        chain: string;
      }
    | 'native';
}

export const ERR_INSUFFICIENT_ALLOWANCE = 'insufficient_allowance';
// NTT errors
export const ERR_NOT_ENOUGH_CAPACITY = 'swap_failed';
export const ERR_SOURCE_CONTRACT_PAUSED = 'source_contract_paused';
export const ERR_DESTINATION_CONTRACT_PAUSED = 'destination_contract_paused';
export const ERR_UNSUPPORTED_ABI_VERSION = 'unsupported_abi_version';
export const ERR_INSUFFICIENT_GAS = 'insufficient_gas';
export const ERR_AMOUNT_TOO_LARGE = 'amount_too_large';
export const ERR_AMOUNT_TOO_SMALL = 'amount_too_small';

export const ERR_USER_REJECTED = 'user_rejected';
export const ERR_TIMEOUT = 'user_timeout';
export const ERR_UNKNOWN = 'unknown';

export type TransferErrorType =
  | typeof ERR_INSUFFICIENT_ALLOWANCE
  | typeof ERR_NOT_ENOUGH_CAPACITY
  | typeof ERR_SOURCE_CONTRACT_PAUSED
  | typeof ERR_DESTINATION_CONTRACT_PAUSED
  | typeof ERR_UNSUPPORTED_ABI_VERSION
  | typeof ERR_INSUFFICIENT_GAS
  | typeof ERR_AMOUNT_TOO_LARGE
  | typeof ERR_AMOUNT_TOO_SMALL
  | typeof ERR_USER_REJECTED
  | typeof ERR_TIMEOUT
  | typeof ERR_UNKNOWN;

export interface ConnectWalletEvent {
  type: 'wallet.connect';
  details: {
    side: TransferWallet;
    chain: Chain;
    wallet: string;
  };
}

export type WormholeConnectEventCore =
  | LoadEvent
  | TransferEvent
  | TransferErrorEvent
  | ConnectWalletEvent;

export interface WormholeConnectEventMeta {
  meta: {
    version: string;
    hash: string;
    host: string;
  };
}

export type WormholeConnectEvent = WormholeConnectEventCore &
  WormholeConnectEventMeta;

// This is used internally to trigger events
export type TriggerEventHandler = (event: WormholeConnectEventCore) => void;

// This is used externally to consume events
export type WormholeConnectEventHandler = (event: WormholeConnectEvent) => void;
