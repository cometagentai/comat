import React from 'react';

import Address from '@/app/_components/address';

import { Landmark } from 'lucide-react';

interface Props {
  address: string;
}

const Header: React.FC<Props> = ({ address }) => {
  return (
    <div>
      <div className='flex items-end gap-2'>
        <Landmark className='h-6 w-6' />
        <h1 className='text-2xl font-bold leading-none'>Portfolio</h1>
        <Address address={address} />
      </div>
    </div>
  );
};

export default Header;
