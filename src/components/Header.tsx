'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    const connected = false
    return (
        <header className='grid grid-cols-2 items-center p-5 bg-secondary'>
            <nav className='flex items-center gap-10'>
                <Link href='/' className='text-2xl font-bold'>IDLE AI </Link>
                <nav className='space-x-5'>
                    <Link
                        href='/agents'
                        className={`${pathname === '/agents' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary duration-300 ease-in-out'}`}
                    >
                        AGENTS
                    </Link>
                    <Link
                        href='/create'
                        className={`${pathname === '/create' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary duration-300 ease-in-out'}`}
                    >
                        CREATE
                    </Link>
                    <Link
                        href='/staking'
                        className={`${pathname === '/staking' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary duration-300 ease-in-out'}`}
                    >
                        STAKING
                    </Link>
                    <Link
                        href='/studio'
                        className={`${pathname === '/studio' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary duration-300 ease-in-out'}`}
                    >
                        STUDIO
                    </Link>
                </nav>
            </nav>
            <nav className='justify-self-end'>
                <Button className='rounded'>Connect Wallet</Button>
            </nav>
        </header>
    )
}
