export interface WalletTokenList {
    success: boolean;
    data: WalletTokenListData;
}

export interface WalletTokenListData {
    wallet: string;
    totalUsd: number;
    items: WalletTokenItem[];
}

export interface WalletTokenItem {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    balance: string;
    uiAmount: number;
    chainId: string;
    logoURI?: string;
    priceUsd?: number;
    valueUsd?: number;
} 