'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FACTORY_EXCHANGE_ABI, FACTORY_EXCHANGE_ADDRESS } from '@/contracts/ABI'
import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'

interface AgentForm {
    name: string;
    ticker: string;
    description: string;
    twitter?: string;
    telegram?: string;
    website?: string;
    discord?: string;
    behavior: string;
}

export default function CreateAgent() {
    const { address } = useAccount()
    const { data: hash, isPending, writeContract, isSuccess: IsSuccessWriteContract } = useWriteContract()

    const [formData, setFormData] = useState<AgentForm>({
        name: '',
        ticker: '',
        description: '',
        twitter: '',
        telegram: '',
        website: '',
        discord: '',
        behavior: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await writeContract({
                abi: FACTORY_EXCHANGE_ABI,
                address: FACTORY_EXCHANGE_ADDRESS,
                functionName: "createToken",
                args: [formData.name, formData.ticker, 1000000000],
                account: address,
            })
        } catch (error) {
            console.error('Transaction failed:', error)
        }
    }

    return (
        <main className='max-w-xl mx-auto my-10 border p-4'>
            <form onSubmit={handleSubmit} className='space-y-5'>
                <section className='space-y-5'>
                    <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Details</h1>
                    <div className='space-y-2'>
                        <Label htmlFor="name">Agent Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder='example: "The Crypto Agent"'
                            className='rounded duration-200 ease-in-out'
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>X or Twitter Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://x.com/TheCryptoAgent"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Telegram Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://t.me/TheCryptoAgent"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Website Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://thecryptoa.com"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Discord Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://discord.com/invite/TheCryptoAgent"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="ticker">Agent Ticker</Label>
                        <Input
                            id="ticker"
                            name="ticker"
                            value={formData.ticker}
                            onChange={handleChange}
                            type="text"
                            placeholder='example: "CRYPTO"'
                            className='rounded duration-200 ease-in-out'
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="description">Agent Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className='resize-none rounded duration-200 ease-in-out'
                            rows={5}
                            placeholder='example: "The Crypto Agent is a bot that tweets about crypto"'
                            required
                        />
                    </div>
                </section>
                <hr />
                <section className='space-y-5'>
                    <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Socials</h1>
                    <div className='space-y-2'>
                        <Label>X or Twitter Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://x.com/TheCryptoAgent"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Telegram Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://t.me/TheCryptoAgent"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Website Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://thecryptoa.com"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Discord Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://discord.com/invite/TheCryptoAgent"'
                            className='rounded duration-200 ease-in-out'
                        />
                    </div>
                </section>
                <hr />
                <section className='space-y-5'>
                    <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Settings</h1>
                    <div className='space-y-2'>
                        <Label htmlFor="behavior">Agent Behavior</Label>
                        <Textarea
                            id="behavior"
                            name="behavior"
                            value={formData.behavior}
                            onChange={handleChange}
                            placeholder='example: "Always talks like a boss. drops a slang and crypto buzzwords nonstop..."'
                            className='resize-none rounded duration-200 ease-in-out'
                            rows={5}
                            required
                        />
                    </div>
                </section>
                <Button
                    type="submit"
                    className='w-full rounded font-bold uppercase'
                    disabled={isPending}
                >
                    {isPending ? 'Creating Agent...' : 'Create Agent'}
                </Button>

                {isPending && <p className="text-center text-yellow-500">Transaction Pending...</p>}
                {IsSuccessWriteContract && <p className="text-center text-green-500">Agent Created Successfully!</p>}
                {hash && (
                    <p className="text-center text-sm text-gray-500">
                        Transaction Hash: {hash}
                    </p>
                )}
            </form>
        </main>
    )
}
