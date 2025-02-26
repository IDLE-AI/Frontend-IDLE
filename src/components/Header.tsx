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
        <header className={pathname === '/' ? 'grid grid-cols-5 my-5 xl:mx-40 2xl:mx-60' : 'grid grid-cols-5 xl:mx-10 2xl:mx-40 py-7'}>
            <nav>
                <Link href='/' className='text-2xl font-bold'>
                    <Image src='/images/idle-logo-primary.png' alt='logo' width={100} height={100} />
                </Link>
            </nav>
            <nav className='col-span-3 place-items-center place-content-center justify-self-center space-x-5'>
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
                    href='https://bento.me/idle'
                    target='_blank'
                    className={`${pathname === 'https://bento.me/idle' ? 'text-[#e879f9] font-bold' : 'text-muted-foreground hover:text-[#e879f9] duration-300 ease-in-out'}`}
                >
                    COMMUNITY
                </Link>
                {/* <Button asChild className='bg-[#86198f] px-5 py-2 rounded hover:bg-[#4a044e] hover:text-[#e879f9] duration-300 ease-in-out'>
                    <Link
                        href='https://bento.me/idle'
                        target='_blank'
                    // className={ }
                    >
                        GET $IDLE
                    </Link>
                </Button> */}
            </nav>
            <nav className={`${pathname === '/' ? 'justify-self-end' : 'hidden'}`}>
                <Button className='font-bold bg-[#86198f] text-primary' size={'lg'} asChild>
                    <Link href='/agents'>
                        GET $IDLE
                    </Link>
                </Button>
            </nav>
            <nav className={`${pathname === '/' ? 'hidden' : 'justify-self-end'}`}>
                <WalletButton />
            </nav>
        </header >
    )
}
