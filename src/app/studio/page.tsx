import { HookTypewriter } from '@/components/HookTypewriter'
import React from 'react'

export default function page() {
    return (
        <main className="flex flex-col items-center justify-center h-[40rem] gap-4">
            <HookTypewriter />
            <p className="text-muted-foreground">Our AI AGENTS feature for <strong>STUDIO MODE</strong> is currently under development</p>
            <div className="rounded bg-[#4a044e] cursor-not-allowed px-4 py-2">
                AVAILABLE SOON
            </div>
        </main>
    )
}
