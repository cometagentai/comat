import React from 'react';

import StarterButton from './starter-button';

const starterButtons = [
  {
    title: 'Trending',
    description: 'Discover hottest tokens',
    icon: 'PresentionChart' as const,
    prompt:
      'What are the top trending tokens right now? Show me the most popular ones.',
  },
  {
    title: 'Stake',
    description: 'Find best SOL staking opportunities & yields',
    icon: 'Moneys' as const,
    prompt: 'What are the highest SOL staking yields available?',
  },
  {
    title: 'Swap',
    description: 'Get best swap rates via Jupiter DEX',
    icon: 'ArrowSwapHorizontal' as const,
    prompt: "Let's trade some tokens",
  },
  {
    title: 'Bridge',
    description: 'Bridge assets across chains securely',
    icon: 'Pharagraphspacing' as const,
    prompt:
      'Bridge 1 SOL to USDT from Solana to Ethereum',
  },
  {
    title: 'Copy Trade',
    description: "Mirror successful traders' strategies",
    icon: 'CopySuccess' as const,
    prompt:
      'I want to copy trade a specific wallet. Can you analyze its recent trading performance?',
  },
  {
    title: 'Copy Contract',
    description: 'Track & copy smart contract interactions',
    icon: 'DocumentCopy' as const,
    prompt:
      'Show me the trading activity for a specific smart contract. What are the most profitable trades?',
  },
] as const;

const StarterButtons = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-[16px] w-full max-w-[565px] mb-[50px] lg:mb-[100px]'>
      {starterButtons.map((button) => (
        <StarterButton key={button.title} {...button} />
      ))}
    </div>
  );
};

export default StarterButtons;
