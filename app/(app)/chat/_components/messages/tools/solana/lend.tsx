import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { LendResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const Lend: React.FC<Props> = ({ tool, prevToolAgent }) => {

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Lending USDC...`}
            result={{
                heading: (result: LendResultType) => result.body 
                    ? `Lent USDC on Lulo`
                    :  "Failed to lend USDC",
                body: (result: LendResultType) => result.body 
                    ? <LendCard amount={tool.args.amount} />
                    :  "No token data found"
            }}
            defaultOpen={true}
            prevToolAgent={prevToolAgent}
        />
    )
}

const LendCard = ({ amount }: { amount: number}) => {
    return (
        <p>
            Successfully lent ${amount} USDC on Lulo.
        </p>
    )
}

export default Lend;