"use client"

import React from 'react'

import ChatInput from './input';
import StarterButtons from './starter-buttons';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const EmptyChat: React.FC = () => {

    return (
        <div className={cn(
            // Base
            "flex flex-col items-center justify-center w-full h-full px-4",
        )}>
            <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 md:gap-8">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <Image src="/cometlogo.png" alt='' height={130} width={130} />
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-center text-3xl text-[#171717] dark:text-white">
                            May I help you?
                        </h1>
                        <p className="text-center text-md font-semibold text-[#171717] dark:text-white mt-2">
                            Coordinate a collective of DeFi Agent to operate on Crypto
                        </p>
                    </div>
                </div>
                <ChatInput />
                <StarterButtons />
            </div>
        </div>
    )
}

export default EmptyChat;