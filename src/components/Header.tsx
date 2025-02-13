'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    return (
        <header className={pathname === '/' ? 'grid grid-cols-2 items-center my-5 xl:mx-40 2xl:mx-60 absolute top-0 left-0 right-0 z-50' : 'grid grid-cols-2 items-center xl:mx-10 2xl:mx-40 border-b-2 p-3 border-[#e879f9]'}>
            <nav className='flex items-center gap-10'>
                <Link href='/' className='text-2xl font-bold'>IDLE AI </Link>
                <nav className='space-x-5'>
                    <Link
                        href='/agents'
                        className={`${pathname === '/agents' ? 'text-[#e879f9] font-bold' : 'text-primary hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        AGENTS
                    </Link>
                    <Link
                        href='/create'
                        className={`${pathname === '/create' ? 'text-[#e879f9] font-bold' : 'text-primary hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        CREATE
                    </Link>
                    <Link
                        href='/staking'
                        className={`${pathname === '/staking' ? 'text-[#e879f9] font-bold' : 'text-primary hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        STAKING
                    </Link>
                    <Link
                        href='/studio'
                        className={`${pathname === '/studio' ? 'text-[#e879f9] font-bold' : 'text-primary hover:text-[#e879f9] duration-300 ease-in-out'}`}
                    >
                        STUDIO
                    </Link>
                </nav>
            </nav>
            <nav className='justify-self-end'>
                <Button className='rounded font-bold' variant='outline' size={'lg'}>
                    <Link href='/agents'>
                        GET STARTED
                    </Link>
                </Button>
            </nav>
        </header>
    )
}
