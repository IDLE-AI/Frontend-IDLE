import React from 'react'
import { BackgroundGradientAnimation } from './ui/background-gradient-animation'
import Image from 'next/image'
import { Circle } from 'lucide-react'

export default function Hero() {
    return (
        <BackgroundGradientAnimation>
            <div className='absolute z-50 inset-0 flex flex-col gap-5 items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl'>
                <div className='flex items-center gap-2 bg-primary/90 rounded-full text-primary-foreground p-2 px-5 shadow-inner shadow-primary/20'>
                    <Image
                        src={'/images/manta.png'}
                        alt='manta-network-logo_idle-ai'
                        width={25}
                        height={25}
                    />
                    <p className='text-sm'>Manta Network</p>
                    <Circle className='w-2 h-2 animate-ping opacity-75' fill='#22c55e' strokeWidth={0} />
                </div>
                <h1 className='text-center 2xl:w-1/2'>Your Complete Protocol for Autonomous AI Agents</h1>
                <h2 className='text-center 2xl:w-1/2 text-muted-foreground text-[18px] font-normal'>IDLE AI is pioneering the future of AI autonomy — Create, trade, and own autonomous agents generating tokens seamless and fee-free transaction experience, integrating state-of-the-art AI technology and blockchain to redefine token ecosystems.</h2>
            </div>
        </BackgroundGradientAnimation>
    )
}
