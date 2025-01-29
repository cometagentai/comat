import React from 'react';

import Address from '@/app/_components/address';
import { Bank } from 'iconsax-react';
import { ColorMode } from '@/app/_contexts';

interface Props {
  address: string;
  mode: ColorMode;
}

const Header: React.FC<Props> = ({ address, mode }) => {
  return (
    <div>
      <div className='flex items-end gap-2'>
        <Bank
          size='24'
          color={mode === ColorMode.DARK ? '#FFFFFF' : '#1E1E1E'}
          variant='Outline'
          className='mr-[3px]'
        />
        <h1 className='text-2xl font-bold leading-none'>Portfolio</h1>
        <Address address={address} />
      </div>
    </div>
  );
};

export default Header;
