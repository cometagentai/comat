import React from 'react';

import Header from './_components/header';
import Tokens from './_components/tokens';
import LiquidityPools from './_components/liquidity-pools';
import Transactions from './_components/transactions';

import { SwapModalProvider } from './_contexts/use-swap-modal';

const Portfolio = ({ params }: { params: Promise<{ address: string }> }) => {
  const [address, setAddress] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAddress = async () => {
      const { address } = await params;
      setAddress(address);
    };
    fetchAddress();
  }, [params]);

  if (!address) {
    return <div>Loading...</div>;
  }

  return (
    <SwapModalProvider>
      <div className='max-w-4xl mx-auto w-full flex flex-col gap-8 md:pt-4 h-full overflow-y-scroll no-scrollbar'>
        <Header address={address} />
        <Tokens address={address} />
        <LiquidityPools address={address} />
        <Transactions address={address} />
      </div>
    </SwapModalProvider>
  );
};

export default Portfolio;
