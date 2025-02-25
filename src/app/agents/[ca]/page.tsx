'use client'
import React from 'react'
import Image from 'next/image'
import BuySell from '@/components/BuySell'
import Transactions from './Transactions'
import { useAccount, useReadContract } from 'wagmi'
import { useParams } from 'next/navigation'
import { FactoryTokenABI, FactoryTokenAddress } from '@/contracts/FactoryToken'
import moment from 'moment'
import AgentModal from '@/components/AgentModal'

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

export default function Page() {
    const { ca } = useParams();
    const { address } = useAccount()
    const { data: AgentData } = useReadContract({
        address: FactoryTokenAddress,
        abi: FactoryTokenABI,
        functionName: 'getTokenByAddress',
        args: [ca]
    }) as { data: Token };
    console.log(AgentData)


    return (
        <main className="xl:m-5 space-y-5 xl:mx-10 2xl:mx-40">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="border border-[#86198f] p-5 xl:col-span-2">
                    {/* <TokenChart /> */}
                </div>

                {/* Token Info Section */}
                {AgentData && (
                    <div className="space-y-5">
                        <div className="border border-[#86198f] p-5 space-y-5">
                            <div className="flex items-center gap-5 bg-[#4a044e] p-3">
                                <Image
                                    src={AgentData.iconURL}
                                    alt={AgentData.name}
                                    width={150}
                                    height={150}
                                    priority
                                    className="aspect-square object-cover"
                                />
                                <div className='space-y-3'>
                                    {/* <h1 className="text-muted-foreground font-medium">CA: {ca?.slice(0, 6)}...{ca?.slice(-4)}</h1> */}
                                    <div className="grid">
                                        <h1 className="text-xl font-bold">{AgentData.name}</h1>
                                        <p className="text-sm">$ {AgentData.ticker}</p>
                                        <p className="text-sm truncate text-muted-foreground">created by: {AgentData.owner?.slice(0, 10)}...{AgentData.owner?.slice(-4)}</p>
                                        <p className="text-xs text-muted-foreground">Created at <span className='text-primary'>{moment(Number(AgentData.createdAt) * 1000).fromNow()}</span></p>
                                    </div>
                                    <AgentModal AgentData={AgentData} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="text-sm">{AgentData.description}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-2">

                            </div>
                        </div>

                        {/* Swap Section */}
                        <div className="border border-[#86198f] p-5 space-y-5">
                            <h1 className="text-lg font-bold">TRADE {AgentData.name}</h1>
                            <BuySell address={address ?? ''} />
                        </div>
                    </div>
                )}
            </div>

            {/* Transactions Section */}
            <div className="border border-[#86198f] p-5">
                <h1 className="text-lg font-bold">TRANSACTIONS</h1>
                <Transactions />
            </div>
        </main>
    )
}
