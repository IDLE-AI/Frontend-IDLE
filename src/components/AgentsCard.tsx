'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useReadContract } from 'wagmi'
import { FactoryTokenABI, FactoryTokenAddress } from '@/contracts/FactoryToken'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Define the Token interface
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

export default function AgentsCard() {
    // Specify the type of AgentData
    const { data: AgentData } = useReadContract({
        address: FactoryTokenAddress,
        abi: FactoryTokenABI,
        functionName: 'getAllTokens',
    }) as { data: Token[] };

    // Sort the tokens by createdAt in descending order
    const sortedTokens = AgentData?.sort((a, b) => {
        return Number(b.createdAt) - Number(a.createdAt);
    });

    return (
        <section className='space-y-5'>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Creation Time</SelectItem>
                    <SelectItem value="dark">Market Cap</SelectItem>
                </SelectContent>
            </Select>
            <div className='grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
                {sortedTokens?.map((token: Token, index: number) => {
                    return (
                        <Link href={`/agents/${token.tokenAddress}`} key={index}>
                            <Card>
                                <CardHeader>
                                    <Image
                                        src={token.iconURL}
                                        width={100}
                                        height={100}
                                        alt={token.name}
                                        priority={true}
                                        className='w-full aspect-square object-cover'
                                    />
                                    <CardTitle>{token.name} <span className='text-xs text-muted-foreground'>${token.ticker}</span></CardTitle>
                                    <CardDescription className='truncate lowercase'>{token.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-xs text-muted-foreground'>MarketCap: <strong className='text-[#e879f9] text-sm'>$5.000</strong></p>
                                    <p className='text-xs text-muted-foreground'>Price: <strong className='text-[#e879f9] text-sm'>$0.00005</strong></p>
                                </CardContent>
                                <CardFooter>
                                    <p className="text-xs text-muted-foreground">Created at <span className='text-primary'>{moment(Number(token.createdAt) * 1000).fromNow()}</span></p>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
