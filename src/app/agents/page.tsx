import React from 'react'
import AgentList from './AgentList'
import { Input } from '@/components/ui/input'
export default function page() {
    return (
        <main className='relative z-10 space-y-10 xl:px-10 2xl:px-40 pt-5 bg-radial from-[#4a044e] to-black'>
            <Input
                placeholder='Search Agent by name, symbol, or address'
                className='w-full duration-100 ease-in-out p-4 text-2xl rounded'
            />
            <AgentList />
        </main>
    )
}
