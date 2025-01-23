export interface RaydiumToken {
    chainId: number;
    address: string;
    programId: string;
    logoURI: string;
    symbol: string;
    name: string;
    decimals: number;
    tags: string[];
    extensions: Record<string, unknown>;
}

export interface RaydiumPeriodStats {
    volume: number;
    volumeQuote: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
    priceMin: number;
    priceMax: number;
    rewardApr: any[];
}

export interface RaydiumPoolInfo {
    type: string;
    programId: string;
    id: string;
    mintA: RaydiumToken;
    mintB: RaydiumToken;
    price: number;
    mintAmountA: number;
    mintAmountB: number;
    feeRate: number;
    openTime: string;
    tvl: number;
    day: RaydiumPeriodStats;
    week: RaydiumPeriodStats;
    month: RaydiumPeriodStats;
    pooltype: string[];
    rewardDefaultInfos: any[];
    farmUpcomingCount: number;
    farmOngoingCount: number;
    farmFinishedCount: number;
    marketId: string;
    lpMint: RaydiumToken;
    lpPrice: number;
    lpAmount: number;
    burnPercent: number;
}

export interface RaydiumPoolResponse {
    id: string;
    success: boolean;
    data: RaydiumPoolInfo[];
}
