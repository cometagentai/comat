import { z } from 'zod';
import { BridgeInputSchema } from './input-schema';
import { SolanaActionResult } from '../solana-action';

export type SolanaBridgeSchemaType = typeof BridgeInputSchema;

export type SolanaBridgeArgumentsType = z.infer<SolanaBridgeSchemaType>;

export type SolanaBridgeResultBodyType = {
  transaction: string;
  inputAmount: number;
  inputToken: string;
  outputToken: string;
  inputChain: string;
  outputChain: string;
};

export type SolanaBridgeResultType =
  SolanaActionResult<SolanaBridgeResultBodyType>;
