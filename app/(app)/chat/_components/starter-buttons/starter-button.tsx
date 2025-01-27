'use client'

import React from 'react'

import { Button, Icon } from '@/components/ui';

import { useChat } from '../../_contexts/chat';

import { cn } from '@/lib/utils';

import { IconName } from '@/types';

interface Props {
    icon: IconName
    title: string
    description: string
    prompt: string,
    className?: string
}

const StarterButton: React.FC<Props> = ({ icon, title, description, prompt, className }) => {

    const { sendMessage } = useChat();

    return (
        <Button 
            className={cn(
                'flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 h-fit justify-start',
                className
            )}
            variant="outline"
            onClick={() => sendMessage(prompt)}
        >
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#292828] dark:text-[#ededed]">
                    <Icon name={icon} className="w-4 h-4" />
                    <p className="text-md font-bold font-arimo">
                        {title}
                    </p>
                </div>
                <p className="text-xs text-[#7b7070] dark:text-[#ada4a4] hidden md:block font-carlito">
                    {description}
                </p>
            </div>
        </Button>
    )
}

export default StarterButton