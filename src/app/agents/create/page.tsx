import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function page() {
    return (
        <main className='max-w-xl mx-auto py-10'>
            <form className='space-y-5'>
                <section className='border p-4 rounded space-y-5'>
                    <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Details</h1>
                    <div>
                        <Label>Agent Name</Label>
                        <Input
                            type="text"
                            placeholder='example: "The Crypto Agent"'
                        />
                    </div>
                    <div>
                        <Label>Agent Ticker</Label>
                        <Input
                            type="text"
                            placeholder='example: "CRYPTO"'
                        />
                    </div>
                    <div>
                        <Label>Agent Description</Label>
                        <Textarea
                            className='resize-none'
                            rows={5}
                            placeholder='example: "The Crypto Agent is a bot that tweets about crypto"'
                        />
                    </div>
                </section>

                <section className='border p-4 rounded space-y-5'>
                    <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Socials</h1>
                    <div>
                        <Label>X or Twitter Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://x.com/TheCryptoAgent"'
                        />
                    </div>
                    <div>
                        <Label>Telegram Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://t.me/TheCryptoAgent"'
                        />
                    </div>
                    <div>
                        <Label>Website Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://thecryptoa.com"'
                        />
                    </div>
                    <div>
                        <Label>Discord Link (optional)</Label>
                        <Input
                            type="text"
                            placeholder='example: "https://discord.com/invite/TheCryptoAgent"'
                        />
                    </div>
                </section>

                <section className='border p-4 rounded space-y-5'>
                    <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Settings</h1>
                    <div>
                        <Label>Agent Age Group</Label>
                        <Input
                            type="text"
                            placeholder='example: "Teen, Adult, etc."'
                        />
                    </div>
                    <div>
                        <Label>Agent Answer Style</Label>
                        <Input
                            type="text"
                            placeholder='example: "Casual, Formal, Sarcasm, Manipulation, Jokes, Loves the feeling, etc."'
                        />
                    </div>
                    <div>
                        <Label>Agent Behavior</Label>
                        <Textarea
                            placeholder='example: "Always talks like a boss. drops a slang and crypto buzzwords nonstop. acts like a gen z teenager. act like a 20 year old girl. act like a 40 year old man."'
                            className='resize-none'
                            rows={5}
                        />
                    </div>
                    <div>
                        <Label>Agent Goals</Label>
                        <Input
                            type='text'
                            placeholder='example: "Sell a product. Get more followers. Get more likes. Get more comments. Get more views. Get more subscribers. etc."'
                        />
                    </div>
                    <div>
                        <Label>Agent Missions</Label>
                        <Input
                            type='text'
                            placeholder='example: "Promote crypto projects. Educate about blockchain. Share market insights. Build community engagement. Create viral content. Drive token adoption. etc."'
                        />
                    </div>
                    <div>
                        <Label>Agent Likes</Label>
                        <Input
                            type='text'
                            placeholder='example: "Crypto, AI, Memes, Office Work, Stuffy Jokes, Rules, etc."'
                        />
                    </div>
                    <div>
                        <Label>Agent Dislikes</Label>
                        <Input
                            type='text'
                            placeholder='example: "Spam, Scams, Hacks, etc."'
                        />
                    </div>
                </section>
                <Button type="submit">Create Agent</Button>
            </form>
        </main>
    )
}
