import React from 'react'
import AgentList from './AgentList'
import { Input } from '@/components/ui/input'
export default function page() {
    return (
        <main className='space-y-10 xl:mx-10 2xl:mx-40 mt-5'>
            <Input
                placeholder='Search Agent by name, symbol, or address'
                className='w-full duration-150 ease-in-out h-10'
            />
            <AgentList />
        </main>
    )
}
