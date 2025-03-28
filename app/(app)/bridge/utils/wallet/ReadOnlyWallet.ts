import {
  Address,
  ChainId,
  IconSource,
  SendTransactionResult,
  Wallet,
} from '@xlabs-libs/wallet-aggregator-core';
import { Chain, chainToChainId, NativeAddress } from '@wormhole-foundation/sdk';
import { EventEmitter } from 'events';

export class ReadOnlyWallet extends Wallet {
  private _isConnected = true;
  private eventEmitter = new EventEmitter();

  static readonly NAME = 'ReadyOnlyWallet';

  constructor(readonly _address: NativeAddress<Chain>, readonly _chain: Chain) {
    super();
  }

  private emit(event: string, ...args: any[]) {
    this.eventEmitter.emit(event, ...args);
  }

  on(event: string, listener: (...args: any[]) => void) {
    this.eventEmitter.on(event, listener);
  }

  getName(): string {
    return ReadOnlyWallet.NAME;
  }

  getUrl(): string {
    return '';
  }

  async connect(): Promise<Address[]> {
    this._isConnected = true;
    this.emit('connect');
    return [this._address.toString()];
  }

  async disconnect(): Promise<void> {
    this._isConnected = false;
    this.emit('disconnect');
  }

  getChainId(): ChainId {
    // TODO: wallet aggregator should use SDK ChainId type
    return chainToChainId(this._chain) as ChainId;
  }

  getNetworkInfo() {
    throw new Error('Method not implemented.');
  }

  getAddress(): Address {
    return this._address.toString();
  }

  getAddresses(): Address[] {
    return [this.getAddress()];
  }

  setMainAddress(address: Address): void {
    console.log('setMainAddress', address);
    // No-op: can't change address for read-only wallet
  }

  async getBalance(): Promise<string> {
    // Could implement this to fetch balance from RPC if needed
    throw new Error('Address only wallet cannot fetch balance');
  }

  isConnected(): boolean {
    return this._isConnected;
  }

  getIcon(): IconSource {
    return '';
  }

  async signTransaction(tx: any): Promise<any> {
    console.log('signTransaction', tx);
    throw new Error('Address only wallet cannot sign transactions');
  }

  async sendTransaction(tx: any): Promise<SendTransactionResult<any>> {
    console.log('sendTransaction', tx);
    throw new Error('Address only wallet cannot send transactions');
  }

  async signMessage(msg: any): Promise<any> {
    console.log('signMessage', msg);
    throw new Error('Address only wallet cannot sign messages');
  }

  async signAndSendTransaction(tx: any): Promise<SendTransactionResult<any>> {
    console.log('signAndSendTransaction', tx);
    throw new Error('Address only wallet cannot sign or send transactions');
  }

  getFeatures(): string[] {
    return [];
  }

  supportsChain(chainId: ChainId): boolean {
    return this.getChainId() === chainId;
  }
}
