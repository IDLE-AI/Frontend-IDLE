import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Twitter } from 'lucide-react'


export default function CardAgent() {
    return (
        <div className='border p-3 space-y-5 backdrop-blur-sm hover:bg-muted/50 hover:border-[#e879f9] transition-all duration-300 transform hover:-translate-y-1'>
            <div className='grid gap-5'>
                <div className='flex items-center gap-5 col-span-2'>
                    {/* <Avatar className='w-12 h-12'>
                        <AvatarImage src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <Image
                        src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg"
                        alt='agent'
                        width={125}
                        height={125}
                        className='rounded aspect-square object-cover'
                    />
                    <div>
                        <h1 className='text-lg font-bold'>NAMA AI AGENT</h1>
                        <p className='text-sm text-muted-foreground font-medium'>AIAGENT/SOL</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3'>
                <div>
                    <p>Price</p>
                    <p>$0.000100</p>
                </div>
                <div>
                    <p>Market Cap</p>
                    <p>$99.9K</p>
                </div>
                <div>
                    <p>Volume</p>
                    <p>$3.4M</p>
                </div>
            </div>
        </div>
    )
}
