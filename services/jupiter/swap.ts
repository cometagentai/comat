import { jupiterQuoteApi } from './client';

import { QuoteResponse } from '@jup-ag/api';

export const getSwapObj = async (
  userPublicKey: string,
  quoteResponse: QuoteResponse
) => {
  const swapObj = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse,
      userPublicKey,
      wrapAndUnwrapSol: true,
    },
  });
  return swapObj;
};
