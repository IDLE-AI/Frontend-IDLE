'use client'
import React from 'react'
import Image from 'next/image'
import { Globe, Twitter } from 'lucide-react'
import BuySell from '@/components/BuySell'
import Transactions from './Transactions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TokenChart from '@/components/TokenChart'
import { useAccount, useReadContract } from 'wagmi'
import { FACTORY_EXCHANGE_ABI, FACTORY_EXCHANGE_ADDRESS } from '@/contracts/ABI'
import { useParams } from 'next/navigation'
import moment from 'moment'

export default function Page() {
    const { ca } = useParams();
    const { address } = useAccount()
    const { data: tokenDetails, isLoading, isError } = useReadContract({
        address: FACTORY_EXCHANGE_ADDRESS,
        abi: FACTORY_EXCHANGE_ABI,
        functionName: 'tokenDetails',
        args: [ca],
    }) as any;

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Error fetching token details</div>;
    if (!tokenDetails) return <div className="text-center py-10 text-gray-500">No token details available</div>;

    const {
        name = tokenDetails[0],
        symbol = tokenDetails[1],
        owner = tokenDetails[3],
        createdAt = tokenDetails[4],
        iconUrl = tokenDetails[5],
        description = tokenDetails[6],
    } = tokenDetails

    // Convert BigInt values to numbers explicitly
    const tokenPrice = Number(tokenDetails[11].toString()) / 1e18 || 0;
    const marketCap = (Number(tokenDetails[2].toString()) * Number(tokenDetails[11].toString())) / 1e14 || 0;

    return (
        <main className="xl:m-5 space-y-5 xl:mx-10 2xl:mx-40">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="border p-5 xl:col-span-2">
                    <TokenChart />
                </div>

                <div className="space-y-5">
                    <div className="border p-5 space-y-5">
                        <div className="flex items-center gap-5">
                            <Image
                                src={iconUrl}
                                alt={name}
                                width={150}
                                height={150}
                                priority
                                className="rounded aspect-square object-cover"
                            />
                            <div className="grid">
                                <h1 className="text-muted-foreground font-medium">CA: {ca?.slice(0, 6)}...{ca?.slice(-4)}</h1>
                                <h1 className="text-xl font-bold">{name}</h1>
                                <p className="text-sm">$ {symbol}</p>
                                <p className="text-sm truncate text-muted-foreground">created by: {owner?.slice(0, 6)}...{owner?.slice(-4)}</p>
                                <p className="text-sm text-muted-foreground">Created at {moment(Number(createdAt.toString()) * 1000).fromNow()}</p>

                                <Button variant="secondary" className="mt-3">
                                    Chat with AI
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <InfoBlock label="Price" value={`$${tokenPrice.toLocaleString("en-US")}`} />
                            <InfoBlock label="Market Cap" value={`$${marketCap.toLocaleString("en-US")}`} />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="text-sm">{description}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <SocialLink href="https://twitter.com/" label="CA: 0x123..." />
                            <SocialLink href="https://twitter.com/" icon={<Twitter />} />
                            <SocialLink href="https://twitter.com/" icon={<Globe />} />
                        </div>
                    </div>

                    <div className="border p-5">
                        <h1 className="text-lg font-bold">SWAP {name}</h1>
                        <h2 className="text-sm text-muted-foreground">Exchange your tokens easily</h2>
                        <BuySell address={address} />
                    </div>
                </div>
            </div>

            <div className="border p-5">
                <h1 className="text-lg font-bold">TRANSACTIONS</h1>
                <Transactions />
            </div>
        </main>
    )
}

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">{value}</p>
    </div>
);

const SocialLink = ({ href, label, icon }: { href: string; label?: string; icon?: React.ReactNode }) => (
    <Link href={href} className="border p-1 flex items-center justify-center text-sm text-muted-foreground">
        {icon || label}
    </Link>
);
