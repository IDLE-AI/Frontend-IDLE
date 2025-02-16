'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import WalletButton from './WalletButton'
export default function Header() {
    const pathname = usePathname()
    return (
        <header className={pathname === '/' ? 'grid grid-cols-2 items-center my-5 xl:mx-40 2xl:mx-60 absolute top-0 left-0 right-0 z-50' : 'grid grid-cols-2 items-center xl:mx-10 2xl:mx-40 border-b-2 py-7 border-[#e879f9]'}>
            <nav className='flex items-center gap-10'>
                <Link href='/' className='text-2xl font-bold'>
                    <Image src='/images/idle-logo-primary.png' alt='logo' width={100} height={100} />
                </Link>
                <nav className='space-x-5'>
                    <Link
                        href='/agents/create'
                        className={`${pathname === '/agents/create' ? 'text-[#e879f9] font-bold' : 'text-muted-foreground hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        CREATE
                    </Link>
                    <Link
                        href='/agents'
                        className={`${pathname === '/agents' ? 'text-[#e879f9] font-bold' : 'text-muted-foreground hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        AGENTS
                    </Link>
                    <Link
                        href='/studio'
                        className={`${pathname === '/studio' ? 'text-[#e879f9] font-bold' : 'text-muted-foreground hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        STUDIO
                    </Link>
                    <Link
                        href='#'
                        className={`${pathname === '/staking' ? 'text-[#e879f9] font-bold' : 'text-muted-foreground hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        COMMUNITY
                    </Link>
                </nav>
            </nav>
            <nav className={`${pathname === '/' ? 'justify-self-end' : 'hidden'}`}>
                <Button className='rounded font-bold' variant='default' size={'lg'}>
                    <Link href='/agents'>
                        GET STARTED
                    </Link>
                </Button>
            </nav>
            <nav className={`${pathname === '/' ? 'hidden' : 'justify-self-end'}`}>
                <WalletButton />
            </nav>
        </header>
    )
}
