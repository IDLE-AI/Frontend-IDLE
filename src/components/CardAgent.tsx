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
            <div className="p-6 bg-white/5 rounded shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-white/10">
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
                        <h2 className="text-lg font-semibold text-[#e879f9]">{ticker}</h2>
                        <p className="text-sm text-muted-foreground">Created at {moment(createdAt * 1000).fromNow()}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-[#e879f9]"
                        >
                            <path d="M11.46 12.4l-.3.13c-.03.01-.06.02-.09.02-.03 0-.06-.01-.09-.02l-.3-.13a.75.75 0 01-.63-.45c-.06-.18-.09-.38-.09-.58 0-.19.03-.38.09-.57.06-.18.15-.34.27-.48l.3-.13c.03-.01.06-.02.09-.02.03 0 .06.01.09.02l.3.13c.12.05.21.15.27.28.06.19.09.39.09.58 0 .2-.03.39-.09.57-.06.19-.15.35-.27.48l-.3.13c-.03.01-.06.02-.09.02-.03 0-.06-.01-.09-.02l-.3-.13a.75.75 0 01-.63-.45zm-7.46 5.6a.75.75 0 01-.63-.45l-.3-.13c-.03-.01-.06-.02-.09-.02-.03 0-.06.01-.09.02l-.3.13a.75.75 0 01-.63.45c-.06.18-.09.38-.09.58 0 .19.03.38.09.57.06.18.15.34.27.48l.3.13c.03.01.06.02.09.02.03 0 .06-.01.09-.02l.3-.13c.12-.05.21-.15.27-.28.06-.19.09-.39.09-.58 0-.2-.03-.39-.09-.57-.06-.19-.15-.35-.27-.48l-.3-.13c-.03-.01-.06-.02-.09-.02-.03 0-.06.01-.09.02l-.3.13a.75.75 0 01-.63.45zm12.92-11.2c-.06.18-.09.38-.09.58 0 .19.03.38.09.57.06.18.15.34.27.48l.3.13c.03.01.06.02.09.02.03 0 .06-.01.09-.02l.3-.13a.75.75 0 01.63-.45c.06-.18.09-.38.09-.58 0-.19-.03-.38-.09-.57-.06-.18-.15-.34-.27-.48l-.3-.13c-.03-.01-.06-.02-.09-.02-.03 0-.06.01-.09.02l-.3.13a.75.75 0 01-.63.45zm-7.46-5.6a.75.75 0 01.63-.45l.3-.13c.03-.01.06-.02.09-.02.03 0 .06.01.09.02l.3.13a.75.75 0 01.63.45c.06.18.09.38.09.58 0 .19-.03.38-.09.57-.06.18-.15.34-.27.48l-.3.13c-.03.01-.06.02-.09.02-.03 0-.06-.01-.09-.02l-.3-.13a.75.75 0 01-.63-.45c-.06-.18-.09-.38-.09-.58 0-.19.03-.38.09-.57.06-.18.15-.34.27-.48l.3-.13c.03-.01.06-.02.09-.02.03 0 .06.01.09.02l.3.13a.75.75 0 01.63.45z" />
                        </svg>
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