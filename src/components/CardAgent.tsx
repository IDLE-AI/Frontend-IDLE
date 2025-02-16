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
        <div className='p-5 bg-gradient-to-r from-[#4a044e] to-[#4a044e]/10 rounded hover:-translate-y-2 duration-100 ease-in-out transition-all grid grid-cols-2 gap-5'>
            <Image
                src={imageUrl}
                alt={`${name} agent`}
                width={150}
                height={150}
                className='rounded aspect-square w-full object-cover'
            />
            <div className='space-y-2'>
                <div>
                    <h1 className='text-lg 2xl:text-xl font-bold '>{name}</h1>
                    <h2 className='text-sm 2xl:text-base text-[#e879f9] font-bold'>{ticker}</h2>
                    <h3 className='text-muted-foreground text-sm'>4w Ago</h3>
                </div>
                <p className='text-muted-foreground text-sm'>created by: 0x1234567890</p>
                <hr className='border-t border-primary' />
                <div>
                    <p className=''>Market Cap</p>
                    <p className='font-bold text-xl text-[#e879f9]'>{formatMarketCap(marketCap)}</p>
                </div>
            </div>
        </div>
    )
}
