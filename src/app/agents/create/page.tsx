'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FACTORY_EXCHANGE_ABI, FACTORY_EXCHANGE_ADDRESS } from '@/contracts/ABI'
import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

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
    const [currentStep, setCurrentStep] = useState(0)

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

    const steps = [
        { title: "Agent Details", component: "details" },
        { title: "Agent Socials", component: "socials" },
        { title: "Agent Settings", component: "settings" }
    ]

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateRequiredFields = () => {
        return (
            formData.name.trim() !== '' &&
            formData.ticker.trim() !== '' &&
            formData.description.trim() !== '' &&
            formData.behavior.trim() !== ''
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (currentStep !== steps.length - 1) {
            nextStep()
            return
        }

        if (!validateRequiredFields()) {
            alert('Please fill in all required fields (Name, Ticker, Description, and Behavior)')
            return
        }

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

    const pageVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    }

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    }

    const renderStep = () => {
        return (
            <AnimatePresence mode="wait">
                {currentStep === 0 && (
                    <motion.section
                        key="details"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className='space-y-5'
                    >
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
                    </motion.section>
                )}

                {currentStep === 1 && (
                    <motion.section
                        key="socials"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className='space-y-5'
                    >
                        <h1 className='text-2xl font-bold uppercase text-[#e879f9]'>Agent Socials</h1>
                        <div className='space-y-2'>
                            <Label>X or Twitter Link (optional)</Label>
                            <Input
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                type="text"
                                placeholder='example: "https://x.com/TheCryptoAgent"'
                                className='rounded duration-200 ease-in-out'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Telegram Link (optional)</Label>
                            <Input
                                name="telegram"
                                value={formData.telegram}
                                onChange={handleChange}
                                type="text"
                                placeholder='example: "https://t.me/TheCryptoAgent"'
                                className='rounded duration-200 ease-in-out'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Website Link (optional)</Label>
                            <Input
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                type="text"
                                placeholder='example: "https://thecryptoa.com"'
                                className='rounded duration-200 ease-in-out'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Discord Link (optional)</Label>
                            <Input
                                name="discord"
                                value={formData.discord}
                                onChange={handleChange}
                                type="text"
                                placeholder='example: "https://discord.com/invite/TheCryptoAgent"'
                                className='rounded duration-200 ease-in-out'
                            />
                        </div>
                    </motion.section>
                )}

                {currentStep === 2 && (
                    <motion.section
                        key="settings"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className='space-y-5'
                    >
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
                    </motion.section>
                )}
            </AnimatePresence>
        )
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='max-w-xl mx-auto my-10 border p-4'
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            <motion.div
                                className={`w-8 h-8 rounded-full flex items-center justify-center 
                                    ${index <= currentStep ? 'bg-[#e879f9]' : 'bg-primary/20'}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                {index + 1}
                            </motion.div>
                            {index < steps.length - 1 && (
                                <motion.div
                                    className={`h-1 w-24 mx-2 ${index < currentStep ? 'bg-[#e879f9]' : 'bg-primary/20'}`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: index * 0.2 }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.form
                onSubmit={handleSubmit}
                className='space-y-5'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {renderStep()}

                <div className="flex justify-between mt-8">
                    <Button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`${currentStep === 0 ? 'hidden' : 'rounded font-bold uppercase'}`}
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <ArrowLeft />
                    </Button>

                    <Button
                        type="button"
                        onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                        className='rounded font-bold uppercase'
                        disabled={
                            (currentStep === steps.length - 1 &&
                                (isPending || !validateRequiredFields()))
                        }
                    >
                        {currentStep === steps.length - 1
                            ? (isPending ? 'Creating Agent...' : 'Create Agent')
                            : 'Next'
                        }
                    </Button>
                </div>

                {isPending && <p className="text-center text-yellow-500">Transaction Pending...</p>}
                {IsSuccessWriteContract && <p className="text-center text-green-500">Agent Created Successfully!</p>}
                {hash && (
                    <p className="text-center text-sm">
                        Transaction Hash: {hash}
                    </p>
                )}
            </motion.form>
        </motion.main>
    )
}
