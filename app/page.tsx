import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import LoginButton from './_components/login-button';
import Image from 'next/image';

const Graph = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-black text-white overflow-hidden'>
      <header className='absolute top-0 w-full flex items-center justify-between sm:justify-center py-3 px-4'>
        <div className='flex items-center'>
          <a
            href='/docs'
            className='text-[18px] font-barlow font-semibold ml-3'
          >
            Docs
          </a>
          <a href='https://x.com/cometsol_ai' target='_blank' className='ml-3'>
            <FaXTwitter className='h-[23px] w-[23px]' />
          </a>
          <a
            href='#'
            target='_blank'
            className='text-[18px] font-semibold ml-3'
          >
            CA
          </a>
        </div>
      </header>

      <div className='flex flex-col md:flex-row items-center justify-around w-full max-w-[910px] gap-4 text-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image src='/logo.png' alt='Logo' height={100} width={300} />
          <p className='text-[20px] font-medium font-arimo'>
            Your AI Agent Partner for Seamless DeFi
          </p>
          <LoginButton />
        </div>
        <Image
          src='/mainworld.gif'
          alt='Main World'
          height={300}
          width={300}
          className='mt-4 md:mt-0'
        />
      </div>
    </div>
  );
};

export default Graph;
