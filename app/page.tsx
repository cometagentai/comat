import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
// import Link from 'next/link';
import LoginButton from './_components/login-button';
import Image from 'next/image';

const Graph = () => {
  return (
    <>
      <header className='flex items-center justify-between sm:justify-center py-3 px-4 relative'>
        {/* <Link href="/" className='flex items-center'>
                        <Image src="/logo.png" alt='' className='mr-1 hidden dark:block' height={70} width={140} />
                        <Image src="/logo-light-v.png" alt='' className='mr-1 light-logo' height={70} width={140} />
                    </Link> */}

        <div className='flex items-center'>
          <a
            href='/docs'
            className='text-[18px] font-barlow font-semibold ml-3 text-white'
          >
            Docs
          </a>
          <a href='https://x.com/cometsol_ai' target='_blank' className='ml-3'>
            {/* <Image
              src='/x-logo.png'
              alt=''
              className='mr-1 hidden dark:block'
              height={30}
              width={30}
            />
            <Image
              src='/x-logo-light.png'
              alt=''
              className='mr-1 light-logo'
              height={30}
              width={30}
            /> */}
            <FaXTwitter color='#ffffff' className='h-[23px] w-[23px]' />
          </a>
          <a
            href='#'
            target='_blank'
            className='text-[18px] font-semibold ml-3 text-white'
          >
            CA
          </a>
        </div>
        {/* <Button variant={'default'} className='sm:absolute relative sm:right-[15px] right-[0px] sm:top-[11px] top-[0px]'>
                    Connect
                </Button> */}
      </header>
      <div>
        <div className='flex flex-col items-center justify-center h-[calc(100vh-60px)] pt-16 pb-4 px-[15px]'>
          <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
            <div className='max-w-[910px] mx-auto w-full flex items-center justify-center md:justify-between flex-col md:flex-row'>
              <div className='flex flex-col items-center justify-center gap-2 text-center'>
                <Image
                  src='/logo.png'
                  alt=''
                  className='mr-1'
                  height={124}
                  width={357}
                />
                {/* <Image
                  src='/logo-light-v.png'
                  alt=''
                  className='mr-1 light-logo'
                  height={124}
                  width={357}
                /> */}
                <p className='text-[20px] font-medium my-[8px] font-arimo text-white'>
                  Your AI Agent Partner for Seamless DeFi
                </p>
                <LoginButton />
              </div>
              <div className='mt-[30px] md:mt-0'>
                <Image
                  src='/mainworld.gif'
                  alt=''
                  className=''
                  height={400}
                  width={400}
                />
              </div>
            </div>

            {/* <div className="w-full flex-1 max-w-2xl rounded-md border border-neutral-200 dark:border-neutral-700 relative">
                            <GraphComponent />
                            <BorderBeam />
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
