import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
// import Link from 'next/link';
import Image from 'next/image';
import Link from 'next/link';

const Docs = () => {
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
          <a href='#' target='_blank' className='ml-3'>
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
            <div className='max-w-[910px] mx-auto w-full flex items-center justify-center flex-col md:flex-row'>
              <div className='flex flex-col items-center justify-center gap-2 text-center'>
                <Link href="/">
                <Image
                  src='/logo.png'
                  alt=''
                  className='mr-1'
                  height={124}
                  width={357}
                />
                </Link>
                {/* <Image
                  src='/logo-light-v.png'
                  alt=''
                  className='mr-1 light-logo'
                  height={124}
                  width={357}
                /> */}
                <p className='text-[20px] font-medium font-arimo text-white mt-[30px]'>
                  Managing your digital assets shouldn’t be complicated or time-consuming. That’s why Comet is here a cutting-edge artificial intelligence platform designed to simplify your crypto journey and handle your daily financial tasks with ease.
                </p>
                <p className='text-[20px] font-medium font-arimo text-white mt-[30px]'>Comet is an advanced artificial intelligence platform designed with a robust infrastructure to simplify your daily tasks and ensure your security. With Comet, complicated graphics and technical terms are now a thing of the past.The platform provides a crystal-clear overview of your portfolio, personalized insights, and actionable recommendations all in plain language.  You will be able to perform your transactions quickly without having to pay high fees. Comet values your time and offers you the best experience. Comet’s artificial intelligence offers you new opportunities and helps you manage your digital wealth easily and securely. With Comet, you can make your payments with cryptocurrency effortlessly or transfer money between accounts to manage your monthly bills seamlessly. Comet becomes your reliable companion by guiding you easily and clearly in the rapidly developing world of technology.</p>
                <p className='text-[20px] font-medium font-arimo text-white mt-[30px]'>Whether you’re a crypto enthusiast or just getting started, Comet empowers you to take control of your digital finances. This is the future of crypto simple, smart, and stress-free.</p>
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

export default Docs;
