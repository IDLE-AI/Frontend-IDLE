import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import moment from 'moment'

interface Agent {
    id: string;
    name: string;
    ticker: string;
    price: number;
    marketCap: number;
    imageUrl: string;
    owner: string;
    createdAt: number;
}

export default function CardAgent({
    id,
    name,
    ticker,
    price,
    marketCap,
    imageUrl,
    owner,
    createdAt,
}: Agent) {
    const formatNumber = (num: number, decimals: number = 6) => {
        return num.toLocaleString('en-US', {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
        })
    }

    const formatMarketCap = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
        }).format(value)
    }

    return (
        <Link href={`/agents/${id}`} className="block group">
            <div className="p-6 bg-secondary/50 rounded shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-white/10">
                <div className="relative aspect-square overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <Image
                        src={imageUrl || '/placeholder-image.jpg'}
                        alt={`${name} agent`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        onLoadingComplete={(img) => {
                            if (img.naturalWidth === 0) {
                                img.src = '/placeholder-image.jpg'
                            }
                        }}
                    />
                </div>

                <div className="mt-4 space-y-3">
                    <div>
                        <h1 className="text-xl font-bold text-primary">{name}</h1>
                        <h2 className="font-semibold text-[#e879f9]">$ {ticker}</h2>
                        <p className="text-sm text-muted-foreground">Created at {moment(createdAt * 1000).fromNow()}</p>
                        <p className="text-sm text-muted-foreground">
                            Created by: {owner?.slice(0, 6)}...{owner?.slice(-4)}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="text-lg font-bold text-[#e879f9]">
                                ${formatNumber(price / 1e18, 4)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Market Cap</p>
                            <p className="text-lg font-bold text-[#e879f9]">
                                ${formatMarketCap(marketCap / 1e14)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}