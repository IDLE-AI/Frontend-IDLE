'use client'
import React from 'react'
import Image from 'next/image'
import BuySell from '@/components/BuySell'
import Transactions from './Transactions'
import { useReadContract } from 'wagmi'
import { useParams } from 'next/navigation'
import { FactoryTokenABI, FactoryTokenAddress } from '@/contracts/FactoryToken'
import moment from 'moment'
import AgentModal from '@/components/AgentModal'
import { BondingProggress } from '@/components/BondingProggress'
import { toast } from "sonner"
import { Copy } from 'lucide-react'


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
    // const { address } = useAccount()
    const { data: AgentData } = useReadContract({
        address: FactoryTokenAddress,
        abi: FactoryTokenABI,
        functionName: 'getTokenByAddress',
        args: [ca]
    }) as { data: Token };

    const [isCopied, setIsCopied] = React.useState(false)

    const copyTextToClipboard = () => {
        if (!navigator.clipboard) {
            toast("Clipboard API not available in your browser.");
            return;
        }

        navigator.clipboard.writeText(AgentData.tokenAddress)
            .then(() => {
                // alert();
                setIsCopied(true)
                toast("Content copied to clipboard!")
                setIsCopied(false)
            })
            .catch(err => {
                console.error("Failed to copy text: ", err);
                // alert("Failed to copy content to clipboard. Please try again.");
                setIsCopied(true)
                toast("Failed to copy content to clipboard. Please try again.", {
                    description: err
                })
                setIsCopied(false)
            });
    };

    return (
        <main className="xl:m-5 space-y-5 xl:mx-10 2xl:mx-40">
            {AgentData && (
                <>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                        <div className="border border-[#86198f] p-5 xl:col-span-2">
                            {/* <TokenChart /> */}
                        </div>

                        {/* Token Info Section */}

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
                                        <div className="grid">
                                            <h1 className="text-xl font-bold">{AgentData.name}</h1>
                                            <p className="text-sm">$ {AgentData.ticker}</p>

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
                                <BuySell AgentData={AgentData} />
                            </div>
                        </div>
                    </div>

                    {/* Transactions Section */}
                    <section className='grid xl:grid-cols-3 gap-5'>
                        <div className="border border-[#86198f] p-5 col-span-2">
                            <h1 className="text-lg font-bold">TRANSACTIONS</h1>
                            <Transactions />
                        </div>
                        <div className="border border-[#86198f] p-5 space-y-5 h-fit">
                            <div className='space-y-5'>
                                <h1>Bonding Curve Proggress: <strong className='text-lg'>70%</strong></h1>
                                <BondingProggress />
                            </div>
                            <p>
                                graduate this coin to raydium at $55,797 market cap.
                                there is 3.254 SOL in the bonding curve.
                            </p>
                            <div className='space-y-5'>
                                <div>
                                    <h1>Contract Address:</h1>
                                    <div className=" flex gap-2 border p-2 w-fit" >
                                        <span className='text-muted-foreground border-r-2 pr-2 border-[#86198f]'>{ca}</span>
                                        <Copy onClick={copyTextToClipboard} />
                                    </div>
                                </div>
                                <div>
                                    <h1>Created by:</h1>
                                    <p className="truncate text-muted-foreground">{AgentData.owner?.slice(0, 10)}...{AgentData.owner?.slice(-4)}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    )
}
