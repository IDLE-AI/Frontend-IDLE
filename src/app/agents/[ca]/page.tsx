import React from 'react'
import Image from 'next/image'
import { Globe, Twitter } from 'lucide-react'
import BuySell from '@/components/BuySell'
import Transactions from './Transactions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TokenChart from '@/components/TokenChart'

type Params = Promise<{ ca: string }>

export default async function page({ params }: { params: Params }) {
    const { ca } = await params
    return (
        <main className='xl:m-5 space-y-5'>
            <div className='grid grid-cols-3 gap-5'>
                {/* <div className='border p-5 col-span-2'> */}
                <TokenChart />
                {/* </div> */}
                <div className='space-y-5'>
                    <div className='border p-5 space-y-5'>
                        <div className='flex items-center gap-5'>
                            <Image
                                src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg"
                                alt="agent"
                                width={150}
                                height={150}
                                priority={true}
                                className='rounded aspect-square object-cover'
                            />
                            <div className='grid'>
                                <h1 className='text-sm truncate text-muted-foreground'>{ca} w</h1>
                                <h1 className='text-lg font-bold'>NAMA AI AGENT</h1>
                                <p className='text-sm'>$ AIAGENT</p>
                                <Button variant='secondary' className='mt-3'>
                                    Chat with AI
                                </Button>
                            </div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div>
                                <p className='text-sm text-muted-foreground'>Price</p>
                                <p className='text-lg font-bold'>$0.000100</p>
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground'>Market Cap</p>
                                <p className='text-lg font-bold'>$99.9K</p>
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground'>Volume</p>
                                <p className='text-lg font-bold'>$3.4M</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-sm text-muted-foreground'>Description</p>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                        </div>

                        <div className='grid grid-cols-3'>
                            <Link href='https://twitter.com/' className='border p-1 place-items-center text-sm text-muted-foreground content-center'>
                                CA: 0x123...
                            </Link>
                            <Link href='https://twitter.com/' className='border p-1 place-items-center text-sm text-muted-foreground content-center'>
                                <Twitter />
                            </Link>
                            <Link href='https://twitter.com/' className='border p-1 place-items-center text-sm text-muted-foreground content-center'>
                                <Globe />
                            </Link>
                        </div>
                    </div>

                    <div className='border p-5'>
                        <h1 className='text-lg font-bold'>SWAP NAMA TOKEN</h1>
                        <h2 className='text-sm text-muted-foreground'>SWAP NAMA TOKEN</h2>
                        <BuySell />
                    </div>
                </div>
            </div>
            <div className='border p-5'>
                <h1 className='text-lg font-bold'>TRANSACTIONS</h1>
                <Transactions />
            </div>
        </main>
    )
}
