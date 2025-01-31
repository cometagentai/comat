export const SOLANA_BRIDGE_PROMPT = `Bridge tokens using Wormhole Bridge.

There are four parameters to swap tokens, all of which are optional:

- inputMint: The mint address of the token to swap
- outputMint: The mint address of the token to receive
- inputAmount: The amount of input token to swap
- inputChain: The chain of the input token (e.g., 'solana' or 'ethereum')
- outputChain: The chian of the output token (e.g., 'solana' or 'ethereum')
- slippageBps: The slippage tolerance in basis points (e.g., 100 for 1%)

If the user provides the input and output token symbols, the agent will use the Solana Get Token Address tool to get the mint addresses.

The user will be shown a Bridge UI where they can edit the parameters and bridge tokens

If the user does not provide some or any of the parameters, leave them undefined.`;
