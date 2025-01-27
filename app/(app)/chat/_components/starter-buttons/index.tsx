import React from 'react';

import StarterButton from './starter-button';

const starterButtons = [
  {
    title: 'Trending',
    description: 'Check the trending tokens',
    icon: 'ChartNoAxesCombined' as const,
    prompt: 'Show me the trending tokens',
  },
  {
    title: 'Stake',
    description: 'Stake Sol',
    icon: 'ArchiveRestore' as const,
    prompt: 'Find me the best staking yields',
  },
  {
    title: 'Swap',
    description: 'Swap on Jupiter',
    icon: 'ArrowLeftRight' as const,
    prompt: "Let's trade some tokens",
  },
  {
    title: 'Bridge',
    description: 'Bridge on Solana',
    icon: 'ChevronsLeftRightEllipsis' as const,
    prompt: 'Bridge token on solana',
  },
  {
    title: 'Copy Trade',
    description: 'Copy Trade any wallet',
    icon: 'Copy' as const,
    prompt: 'Copy trade any wallet',
  },
  {
    title: 'Copy Contract',
    description: 'Copy Trade any contract',
    icon: 'FileStack' as const,
    prompt: "Copy trade any contract's wallet",
  },
] as const;

const StarterButtons = () => {
  return (
    <div className='grid grid-cols-3 gap-1'>
      {starterButtons.map((button) => (
        <StarterButton key={button.title} {...button} />
      ))}
    </div>
  );
};

export default StarterButtons;
