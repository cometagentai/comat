import { memo } from 'react';

import * as icons from 'iconsax-react';

import { cn } from '@/lib/utils';

import type { IconSaxName } from '@/types';

export type IconSaxProps = {
  name: IconSaxName;
  className?: string;
  strokeWidth?: number;
};

export const IconSax = memo(
  ({ name, className, strokeWidth }: IconSaxProps) => {
    const IconComponent = icons[name];

    if (!IconComponent) {
      return null;
    }

    return (
      <IconComponent
        variant='Outline'
        className={cn('w-4 h-4', className)}
        strokeWidth={strokeWidth || 2.5}
        color={'#2C99F4'}
      />
    );
  }
);

IconSax.displayName = 'IconSax';
