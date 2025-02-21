'use client'
import React from 'react'
import { useAccount } from 'wagmi'

export default function Page() {
    const { address } = useAccount()
    return (
        <div>
            <p>{address}</p>
        </div>
    )
}
