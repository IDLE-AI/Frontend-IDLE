import Image from 'next/image'
import React from 'react'

interface AgentProps {
    name: string;
    ticker: string;
    price: number;
    marketCap: number;
    imageUrl: string;
}

export default function CardAgent({ name, ticker, price, marketCap, imageUrl }: AgentProps) {
    // Format numbers with proper formatting
    const formatPrice = (price: number) => {
        return `$${price.toFixed(6)}`
    }

    const formatMarketCap = (marketCap: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
        }).format(marketCap)
    }

    return (
        <div className='space-y-3 p-4 hover:rounded hover:-translate-y-2 hover:shadow-lg hover:bg-[#86198f] hover:border-[#e879f9] duration-100 ease-in-out transition-all'>
            <Image
                src={imageUrl}
                alt={`${name} agent`}
                width={250}
                height={250}
                className='rounded aspect-square object-cover w-full'
            />
            <div>
                <h1 className='text-lg font-bold'>{name}</h1>
                <h2 className='text-sm text-muted-foreground font-medium'>{ticker}</h2>
            </div>
            <div className='grid grid-cols-2'>
                <div>
                    <p className='text-muted-foreground text-sm'>Price</p>
                    <p className='font-bold'>{formatPrice(price)}</p>
                </div>
                <div>
                    <p className='text-muted-foreground text-sm'>Market Cap</p>
                    <p className='font-bold'>{formatMarketCap(marketCap)}</p>
                </div>
            </div>
        </div>
    )
}
