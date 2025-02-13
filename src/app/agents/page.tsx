import React from 'react'
import AgentList from './AgentList'
import { Input } from '@/components/ui/input'
export default function page() {
    return (
        <main className='m-5 space-y-10'>
            <Input
                placeholder='Search Agent by name, symbol, or address'
                className='w-full duration-150 ease-in-out'
            />
            <AgentList />
        </main>
    )
}
