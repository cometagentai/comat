import React from 'react';

import { IconSax } from '@/components/ui';

import { IconSaxName } from '@/types';

interface Props {
  name: string;
  icon: IconSaxName;
  objective: string;
}

const AgentHeader: React.FC<Props> = ({ name, icon, objective }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <IconSax name={icon} className='w-6 h-6' />
        <h1 className='text-2xl font-bold'>{name}</h1>
      </div>
      <p className='text-md text-neutral-700 dark:text-neutral-300'>
        <span className='font-bold'>Objective:</span> {objective}
      </p>
    </div>
  );
};

export default AgentHeader;
