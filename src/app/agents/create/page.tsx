'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import WalletButton from '@/components/WalletButton'
import Link from 'next/link'
import { TokenABI, TokenAddress } from '@/contracts/Token'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FactoryTokenABI, FactoryTokenAddress } from '@/contracts/FactoryToken'
import { parseUnits } from 'viem'

export default function CreateAgent() {
    const { address, isConnected } = useAccount()

    // Read the balance of the token
    const { data: balanceIdleToken } = useReadContract({
        address: TokenAddress,
        abi: TokenABI,
        functionName: "balanceOf",
        args: [address], // Fallback address
    })

    // Prepare to write to the contract
    const { data: transactionHash, isPending, writeContract, isSuccess, } = useWriteContract()

    const [currentStep, setCurrentStep] = useState(0)
    // const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleSubmit = async () => {
        try {
            // Approve the token transfer
            const approvalTx = await writeContract({
                address: TokenAddress,
                abi: TokenABI,
                functionName: "approve",
                args: [FactoryTokenAddress, parseUnits(formik.values.paymentAmount.toString(), 18)], // Approve FactoryToken to spend paymentAmount
            });

            // Create the token with payment
            const createTokenTx = await writeContract({
                address: FactoryTokenAddress,
                abi: FactoryTokenABI,
                functionName: "createTokenWithPayment",
                args: [formik.values.name, formik.values.ticker, formik.values.iconUrl, formik.values.description, formik.values.twitter, formik.values.website, formik.values.behavior, parseUnits(formik.values.paymentAmount.toString(), 18)],
            })

            console.log('Approval Transaction:', approvalTx)
            console.log('Create Token Transaction:', createTokenTx)
        } catch (error) {
            console.error('Transaction failed:', error)
            alert('Transaction failed. Please try again.')
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            ticker: '',
            iconUrl: '',
            description: '',
            twitter: '',
            website: '',
            behavior: '',
            paymentAmount: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            ticker: Yup.string().required('Required'),
            iconUrl: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            twitter: Yup.string(),
            website: Yup.string(),
            behavior: Yup.string().required('Required'),
            paymentAmount: Yup.number().required('Required').positive().integer(),
        }),
        onSubmit: handleSubmit,
    });

    // Wait for transaction confirmation
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: transactionHash || undefined, // Ensure hash is defined
    })

    const uploadFile = async (file: File) => {
        try {
            // setUploading(true)
            const data = new FormData()
            data.set("file", file)
            const uploadRequest = await fetch("/api/pinata", {
                method: "POST",
                body: data,
            })
            const ipfsUrl = await uploadRequest.json()

            formik.setFieldValue('iconUrl', ipfsUrl) // Update the iconUrl in formik state
            // setUploading(false)
            console.log("ipfsUrl", ipfsUrl)
            return ipfsUrl
        } catch (e) {
            console.error(e)
            // setUploading(false)
            alert("Error uploading file")
            return null
        }
    }

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Show preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string) // Update imagePreview state
                formik.setFieldValue('image', file) // Update image in formik state
            }
            reader.readAsDataURL(file)
            await uploadFile(file) // Call uploadFile to upload the image
        }
    }

    if (!isConnected) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-8 text-[#e879f9]">Connect Your Wallet</h1>
                <p className="text-gray-400 mb-8">Please connect your wallet to create an agent</p>
                <WalletButton />
            </div>
        )
    }

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
                        <div>
                            <p className={`${Number(balanceIdleToken) > 0 ? "text-green-500" : "text-red-500"}`}>{Number(balanceIdleToken) > 0 ? "You are Eligible to Create an AI Agent." : "Please buy IDLE tokens first to create an agent."}</p>
                            <span className='text-sm text-muted-foreground'>{(Number(balanceIdleToken) / 1e18).toFixed(0)} IDLE</span>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="image">Agent Image</Label>
                            <div className='flex items-center gap-5'>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    className='rounded duration-200 ease-in-out'
                                    required
                                />
                            </div>
                            {imagePreview && (
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={150}
                                    height={150}
                                    className='rounded-lg object-cover aspect-square'
                                />
                            )}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="name">Agent Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                value={formik.values.ticker}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                value={formik.values.twitter}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                placeholder='example: "https://x.com/TheCryptoAgent"'
                                className='rounded duration-200 ease-in-out'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Website Link (optional)</Label>
                            <Input
                                name="website" // Corrected from telegram to website
                                value={formik.values.website}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                placeholder='example: "https://website.com/TheCryptoAgent"'
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
                                value={formik.values.behavior}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='example: "Always talks like a boss. drops a slang and crypto buzzwords nonstop..."'
                                className='resize-none rounded duration-200 ease-in-out'
                                rows={5}
                                required
                            />
                        </div>

                        <div className='space-y-2 w-fit'>
                            <Label htmlFor="paymentAmount">IDLE Amount</Label>
                            <div className='flex items-center relative'>
                                <Input
                                    id="paymentAmount" // Added id for the input
                                    name="paymentAmount" // Added name for the input
                                    value={formik.values.paymentAmount} // Bind value to formik
                                    onChange={formik.handleChange} // Handle change
                                    onBlur={formik.handleBlur} // Handle blur
                                    placeholder='example: 10'
                                    className='resize-none rounded duration-200 ease-in-out'
                                    required
                                />
                                <span className='absolute right-1 bg-secondary p-1 px-3 rounded text-primary'>IDLE</span>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        )
    }

    return (
        <main className='bg-radial from-[#4a044e] to-black min-h-[calc(100vh-20vh)] flex items-center justify-center'>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='rounded p-5 my-10 xl:w-1/3 2xl:w-1/4 bg-secondary'
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
                    onSubmit={formik.handleSubmit}
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
                            type="submit"
                            onClick={nextStep}
                            className='rounded font-bold uppercase'
                            disabled={
                                (currentStep === steps.length - 1 && (isPending || isConfirming || isSuccess || isConfirmed))
                            }
                        >
                            {currentStep === steps.length - 1
                                ? (isPending ? 'Creating Agent...' : 'Create Agent')
                                : 'Next'
                            }
                        </Button>
                    </div>

                    <div className='grid place-content-center gap-2'>
                        {/* {uploading && <p className="text-center text-yellow-500">Uploading data...</p>}
                        {isPending && <p className="text-center text-yellow-500">Transaction Pending...</p>}
                        {isConfirming && <p className="text-center text-yellow-500">Transaction Confirming...</p>} */}
                        {/* {isError && <p className="text-center text-red-500">Error: {isError.message}</p>} */}
                        {/* {isSuccess && isConfirmed && transactionHash && <div>Transaction Hash: {transactionHash}</div>} */}
                        {isConfirming && <div>Waiting for confirmation...</div>}
                        {isConfirmed && <p className='text-muted-foreground'>Transaction confirmed!</p>}
                        {isConfirmed &&
                            <Button asChild className='rounded'>
                                <Link href={`https://pacific-explorer.sepolia-testnet.manta.network/tx/${transactionHash}`} target="_blank">View Transaction</Link>
                            </Button>
                        }
                    </div>
                </motion.form>
            </motion.main>
        </main >
    )
}
