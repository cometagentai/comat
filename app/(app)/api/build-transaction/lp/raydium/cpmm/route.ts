import { NextResponse, NextRequest } from "next/server";

import { openStandardLPPosition } from "@/services/raydium";
import { Percent } from "@raydium-io/raydium-sdk-v2";

export const POST = async (req: NextRequest) => {
    const { poolId, baseIn, address } = await req.json();

    // const tx = await openStandardLPPosition({ poolId, inputAmount: "10000000", baseIn, slippage: new Percent(5) });

    const tx = await openStandardLPPosition({ poolId, address, inputAmount: "1", baseIn, slippage: new Percent(1, 100) });

    return NextResponse.json({ tx });
}