import React from 'react'
import CardAgent from '@/components/CardAgent'
export default function AgentList() {
    return (
        <div className='grid xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
            <a href="/agents/0xE463b4c1F36163a28bFa8F942248250FcbF58622">
                <CardAgent />
            </a>
            <a href="/agents/0xE463b4c1F36163a28bFa8F942248250FcbF58622">
                <CardAgent />
            </a>
            <a href="/agents/0xE463b4c1F36163a28bFa8F942248250FcbF58622">
                <CardAgent />
            </a>
            <a href="/agents/0xE463b4c1F36163a28bFa8F942248250FcbF58622">
                <CardAgent />
            </a>
        </div>
    )
}
