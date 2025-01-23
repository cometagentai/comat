import React from 'react'

// import { BorderBeam } from '@/components/ui';
import Link from 'next/link';
// import GraphComponent from './_components'
import LoginButton from './_components/login-button';
import Image from 'next/image';


const Graph = () => {
    return (
        <>
            <header className='flex items-center justify-between border-b-[2px] border-[#00000012] dark:border-[white] py-2 px-4'>
                <div>
                    <Link href="/" className='flex items-center'>
                        <Image src="/logo.png" alt='' className='mr-1 hidden dark:block' height={50} width={50} />
                        <Image src="/logo-light-v.png" alt='' className='mr-1 light-logo' height={50} width={50} />
                        <span className="text-xl font-bold">Comat</span>
                    </Link>
                </div>
                <div className='flex items-center'>
                    <a href='#' target='_blank' className="text-[16px] font-semibold ml-3">Docs</a>
                    <a href='#' target='_blank' className="text-[16px] font-semibold ml-3">CA</a>
                    <a href='#' target='_blank' className="text-[16px] font-semibold ml-3">
                        <Image src="/x-logo.svg" alt='' className='mr-1 hidden dark:block' height={25} width={25} />
                        <Image src="/x-logo-light.svg" alt='' className='mr-1 light-logo' height={25} width={25} />
                    </a>
                </div>
            </header>
            <div className="flex flex-col items-center justify-center h-screen pt-16 pb-4">
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h1 className="text-4xl sm:text-7xl font-bold text-sidebar-active">
                            Meet the Comat
                        </h1>
                        <p className="text-1xl sm:text-2xl mb-3">
                            A modular network of interoperable DeFi agents
                        </p>
                        <LoginButton />
                    </div>
                    {/* <div className="w-full flex-1 max-w-2xl rounded-md border border-neutral-200 dark:border-neutral-700 relative">
                        <GraphComponent />
                        <BorderBeam />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Graph;