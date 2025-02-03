import { Connection } from '@solana/web3.js';

import { SolanaGetTokenAddressAction } from '@/ai/solana/actions';

import {
  SOLANA_GET_TOKEN_ADDRESS_NAME,
  SOLANA_BRIDGE_NAME,
} from '@/ai/action-names';
import { solanaTool } from '@/ai/solana';
import { SolanaBridgeAction } from '@/ai/solana/actions/bridge';

export const BRIDGE_TOOLS = {
  [`bridge-${SOLANA_BRIDGE_NAME}`]: solanaTool(
    new SolanaBridgeAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`bridge-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: solanaTool(
    new SolanaGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
