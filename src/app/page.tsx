import Hero from '@/components/Hero'
import React from 'react'
import { ChartCandlestick, SendToBack, UserPlus } from 'lucide-react'
import { Roadmap } from '@/components/Roadmap'
import { ElizaParallax } from '@/components/ElizaParallax'
import { HookTypewriter } from '@/components/HookTypewriter'
export default function page() {
  return (
    <main className='space-y-40'>
      <Hero />
      <section className='space-y-10' >
        <div className='space-y-2 text-center'>
          <p className='font text-[#e879f9]'>Universal Deployment AI Agents Platform</p>
          <h1 className='text-4xl font-bold'>One Solution, Endless Possibilities The Power to Unite All in One</h1>
        </div>

        <div className='grid grid-cols-3 gap-10 xl:mx-40 2xl:mx-60'>
          <div className='flex flex-col justify-between gap-5 rounded border p-5 hover:bg-primary/10 transition-all duration-300 ease-in-out hover:border-[#e879f9]'>
            <h1 className='text-xl font-semibold'>Protocol Layer</h1>
            <p className='text-muted-foreground'>
              Foundation with built-in DEX, token creation, fee distribution, and staking mechanisms
            </p>
          </div>

          <div className='flex flex-col justify-between gap-5 rounded border p-5 hover:bg-primary/10 transition-all duration-300 ease-in-out hover:border-[#e879f9]'>
            <h1 className='text-xl font-semibold'>Context-aware interactions</h1>
            <p className='text-muted-foreground'>
              using its memory system and providers.
            </p>
          </div>

          <div className='flex flex-col justify-between gap-5 rounded border p-5 hover:bg-primary/10 transition-all duration-300 ease-in-out hover:border-[#e879f9]'>
            <h1 className='text-xl font-semibold'>Framework Layer</h1>
            <p className='text-muted-foreground'>
              Unified execution layer for ElizaOS.
            </p>
          </div>
        </div>
      </section>
      {/* 
      <section className='flex flex-col items-center justify-center'>
        <h1 className='text-7xl italic font-bold text-[#e879f9]'>TOKEN LAUNCH AVAILABLE SOON</h1>
      </section> */}

      <section className='space-y-5 xl:mx-40 2xl:mx-60 grid grid-cols-2 gap-10 items-center'>
        <div className='space-y-2 '>
          <p className='text-[#e879f9]'>BUILD. DEPLOY. TRADE. INTERACT.</p>
          <h1 className='text-5xl font-bold'>The Home of AI AGENTS</h1>
        </div>

        <div className='grid grid-cols-2 gap-10'>
          <div className='space-y-2 hover:bg-primary/10 transition-all duration-300 ease-in-out p-3'>
            <UserPlus className='bg-[#e879f9] text-primary-foreground rounded p-1 w-7 h-7' />
            <h1 className='text-2xl font-bold uppercase'>Build</h1>
            <p className='text-muted-foreground'>Build your own agents with the IDLE AI on ElizaOS Framework</p>
          </div>
          <div className='space-y-2 hover:bg-primary/10 transition-all duration-300 ease-in-out p-3'>
            <SendToBack className='bg-[#e879f9] text-primary-foreground rounded p-1 w-7 h-7' />
            <h1 className='text-2xl font-bold uppercase'>DEPLOY</h1>
            <p className='text-muted-foreground'>Deploy your personal AI Agents</p>
          </div>
          <div className='space-y-2 hover:bg-primary/10 transition-all duration-300 ease-in-out p-3'>
            <ChartCandlestick className='bg-[#e879f9] text-primary-foreground rounded p-1 w-7 h-7' />
            <h1 className='text-2xl font-bold uppercase'>TRADE</h1>
            <p className='text-muted-foreground'>Everyone can trade your personal AI agents.</p>
          </div>
          <div className='space-y-2 hover:bg-primary/10 transition-all duration-300 ease-in-out p-3'>
            <UserPlus className='bg-[#e879f9] text-primary-foreground rounded p-1 w-7 h-7' />
            <h1 className='text-2xl font-bold uppercase'>Interact</h1>
            <p className='text-muted-foreground'>Everyone can interact with your personal AI agents.</p>
          </div>
        </div>
      </section>
      {/* 
      <section className='grid grid-cols-2 items-center gap-10 xl:mx-40 2xl:mx-60'>
        <div>
          <Image src='/images/eliza.png' alt='idle' width={600} height={600} priority={true} className='rounded border-2 border-[#e879f9] w-full' />
        </div>
        <div className='text-end'>
          <p className='text-[#e879f9]'>Development tools</p>
          <h1 className='text-5xl font-bold'>AI Acceleration Tools</h1>
          <p className='text-2xl text-muted-foreground'>All-in-One Development Suite for Building, Deploying, and Managing AI Agents on Manta Network.</p>
        </div>
      </section > */}
      <ElizaParallax />
      <Roadmap />
      {/* <HookTypewriter /> */}
    </main >
  )
}
