import React from 'react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { useReadContract } from 'wagmi'
import { TokenABI, TokenAddress } from '@/contracts/Token'

interface Token {
    name: string;
    ticker: string;
    iconURL: string;
    description: string;
    Twitter: string;
    Website: string;
    Behavior: string;
    createdAt: bigint;
    owner: string;
    totalSupply: bigint;
    tokenAddress: string;
}

export default function BuySell({ AgentData }: { AgentData: Token }) {

    const { data: balanceIdleToken } = useReadContract({
        abi: TokenABI,
        address: TokenAddress,
        functionName: 'balanceOf',
        args: [AgentData.owner],
        // Mencegah hook dipanggil sebelum address tersedia
    })


    // const formattedBalance = balanceIdleToken ? Number(balanceIdleToken).toLocaleString() : '0'

    return (
        <>
            {AgentData && (
                <Tabs defaultValue="buy" className="w-full space-y-5">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="buy">Buy</TabsTrigger>
                        <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy">
                        <div className="space-y-2">
                            <div className='flex items-center justify-between text-sm text-muted-foreground gap-5'>
                                <h1>Amount (IDLE)</h1>
                                {AgentData && (<p>Balance: {Number(balanceIdleToken) / 1e18} IDLE</p>)}
                            </div>
                            <Input type="text" placeholder="Enter amount to buy" />
                            <p className='text-sm text-muted-foreground'>You will receive: 0 {AgentData.ticker}</p>
                            <Button className="w-full">Confirm Buy</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="sell">
                        <div className="space-y-2">
                            <div className='flex items-center justify-between text-sm text-muted-foreground gap-5'>
                                <h1>Amount ({AgentData.ticker}) </h1>
                                <p>Balance: 0 {AgentData.ticker}</p>
                            </div>
                            <Input type="text" placeholder="Enter amount to sell" />
                            <p className='text-sm text-muted-foreground'>You will receive: 0 IDLE</p>
                            <Button className="w-full">Confirm Sell</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            )}
        </>
    )
}

