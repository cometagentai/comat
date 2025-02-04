'use client';

import React, { useMemo, useState } from 'react';
import config from './config';
import { useDispatch } from 'react-redux';
import { clearTransfer } from './store/transferInput';

import Bridge from './views/v2/Bridge';
import { isEmptyObject } from './utils';
import { setConfig } from 'next/config';

export default function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isEmptyObject({})) {
      setConfig({});
      dispatch(clearTransfer());
    }

    config.triggerEvent({
      type: 'load',
      config: {},
    });
  }, []);

  return (
    <div className='flex-1 h-0 overflow-y-hidden w-full'>
      <Bridge />
    </div>
  );
}
