'use client';

import React from 'react';

import { Moon, Sun } from 'iconsax-react';
import { Button, useSidebar } from '@/components/ui';

import { ColorMode, useColorMode } from '@/app/_contexts';

const ColorModeToggle = () => {
  const { open, isMobile } = useSidebar();

  const { mode, setMode } = useColorMode();

  if (!isMobile && !open) return null;

  return (
    <Button
      aria-label='Toggle color mode'
      onClick={() =>
        setMode(mode === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK)
      }
      size='icon'
      variant='ghost'
      // className='shrink-0'
    >
      {mode === ColorMode.DARK ? (
        <Sun className='w-4 h-4' variant='Outline' size={25} color='#FFFFFF' />
      ) : (
        <Moon className='w-4 h-4' variant='Outline' size={25} color='#000' />
      )}
    </Button>
  );
};

export default ColorModeToggle;
