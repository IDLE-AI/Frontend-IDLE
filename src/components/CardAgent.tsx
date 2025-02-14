import Image from 'next/image'
import React from 'react'


export default function CardAgent() {
    return (
        <div className='space-y-3'>
            <Image
                src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg"
                alt='agent'
                width={250}
                height={250}
                className='rounded aspect-square object-cover'
            />
            <div>
                <h1 className='text-lg font-bold'>NAMA AI AGENT</h1>
                <h2 className='text-sm text-muted-foreground font-medium'>$TICKER</h2>
            </div>
            <div className='grid grid-cols-2'>
                <div>
                    <p className='text-muted-foreground text-sm'>Price</p>
                    <p>$0.000100</p>
                </div>
                <div>
                    <p className='text-muted-foreground text-sm'>Market Cap</p>
                    <p>$99.9K</p>
                </div>
            </div>
        </div >
    )
}
