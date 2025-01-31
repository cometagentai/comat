import { z } from 'zod';

export const BridgeInputSchema = z.object({
  outputMint: z
    .string()
    .optional()
    .describe('The mint address of the token to receive.'),
  inputAmount: z
    .number()
    .positive()
    .optional()
    .describe('The amount of input token to swap'),
  inputMint: z
    .string()
    .optional()
    .describe('The mint address of the token to swap.'),
  inputChain: z
    .string()
    .optional()
    .describe("The chain of the input token (e.g., 'solana' or 'ethereum')"),
  outputChain: z
    .string()
    .optional()
    .describe("The chain of the output token (e.g., 'solana' or 'ethereum')"),
  slippageBps: z
    .number()
    .default(500)
    .optional()
    .describe('The slippage tolerance in basis points (e.g., 100 for 1%)'),
});
