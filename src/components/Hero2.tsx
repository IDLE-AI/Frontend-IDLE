'use client'
import React from 'react'
import { Button } from './ui/button'
import { Particles } from './magicui/particles'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'


export default function Hero2() {
    return (
        <section className='grid grid-cols-2 relative mt-20 border-b border-[#d946ef]'>
            <div>
                <div className='pl-20 py-28 2xl:pl-60 '>
                    <h1 className='text-8xl font-bold'>IDLE</h1>
                    <h2 className='text-[#d946ef] xl:text-xl 2xl:text-2xl'>Intelligent Decentralized Launchpad Ecosystem,</h2>
                    <h3 className='xl:text-xl 2xl:text-2xl'>Your Complete Protocol Layer for Autonomous AI Agents.</h3>
                </div>
                <div className='border-t border-[#c026d3] p-20  2xl:pl-60 py-28 space-y-5'>
                    <div className='grid grid-cols-2 items-center gap-10'>
                        <Button variant={'outline'} className='text-[#d946ef] border-[#d946ef] font-bold text-lg' size={'lg'} asChild>
                            <Link href={'/agents'}>
                                Explore Agents
                            </Link>
                        </Button>
                        <MoveRight stroke='#c026d3' size={45} />
                    </div>
                    <h2 className='text-2xl font-light'>IDLE AI is pioneering the future of AI autonomy — <strong className='text-[#d946ef] capitalize font-bold'>Create, trade, and own autonomous agents generating tokens</strong> seamless and <strong className='text-[#d946ef] capitalize font-bold'>fee-free transaction experience</strong>, integrating state-of-the-art AI technology and blockchain to redefine token ecosystems.</h2>
                </div>
            </div>

            <div className='border-l border-[#d946ef] px-20 py-10 space-y-5'>
                <h1 className='text-5xl text-[#d946ef]'>GET $IDLE PRESALE NOW!</h1>

                <div className='w-fit space-y-5'>
                    <div className='flex items-center relative'>
                        <div>
                            <h1>You Pay</h1>
                            <input placeholder='AMOUNT' className='text-3xl pl-0 p-2 outline-none border-none' />
                        </div>
                        <div className='flex items-center absolute right-0 top-0 bottom-0 bg-accent px-3'>
                            <Image
                                src={'/images/eth.png'}
                                width={50}
                                height={50}
                                priority={true}
                                alt='eth'
                            />
                            <p className='text-2xl'>ETH</p>
                        </div>
                    </div>
                    <hr className='border-[#d946ef]' />
                    <div className='flex items-center relative'>
                        <div>
                            <h1>You Pay</h1>
                            <input placeholder='AMOUNT' className='text-3xl pl-0 p-2 outline-none border-none' />
                        </div>
                        <div className='flex items-center absolute right-0 top-0 bottom-0 bg-accent px-3'>
                            {/* <Image
                                src={'/images/Idle AI_Logo Primary.svg'}
                                width={50}
                                height={50}
                                priority={true}
                                alt='eth'
                            /> */}
                            <p className='text-2xl'>IDLE</p>
                        </div>
                    </div>
                    <Button className='w-full capitalize font-bold text-lg' variant={"secondary"} disabled size='lg'>coming soon</Button>
                </div>
            </div>

            <Particles
                className="absolute inset-0 z-0"
                quantity={200}
                ease={80}
                color={"#d946ef"}
                refresh
            />
        </section >
    )
}
