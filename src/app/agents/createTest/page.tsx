'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FactoryTokenABI, FactoryTokenAddress } from '@/contracts/FactoryToken'
import { TokenABI, TokenAddress } from '@/contracts/Token'
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { parseUnits } from 'viem'

export default function Page() {
    const { address, isConnected } = useAccount()

    // Read the balance of the token
    const { data: balanceIdleToken, isLoading: isLoadingBalance, isSuccess: isBalanceFetched } = useReadContract({
        address: TokenAddress,
        abi: TokenABI,
        functionName: "balanceOf",
        args: [address], // Fallback address
    })

    // Prepare to write to the contract
    const { data: transactionHash, isPending, writeContract, isSuccess, isError } = useWriteContract()

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            // Approve the token transfer
            const approvalTx = await writeContract({
                address: TokenAddress,
                abi: TokenABI,
                functionName: "approve",
                args: [FactoryTokenAddress, parseUnits("1000", 18)], // Approve FactoryToken to spend 1000 IDLE
            });

            // Create the token with payment
            const createTokenTx = await writeContract({
                address: FactoryTokenAddress,
                abi: FactoryTokenABI,
                functionName: "createTokenWithPayment",
                args: ["TESTING", "TESTING", "TESTING", "TES", "TST", "", "", parseUnits("1000", 18)],
            })

            console.log('Approval Transaction:', approvalTx)
            console.log('Create Token Transaction:', createTokenTx)
        } catch (error) {
            console.error('Transaction failed:', error)
            alert('Transaction failed. Please try again.')
        }
    }

    // Wait for transaction confirmation
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: transactionHash,
    })

    return (
        <div>
            <h1>Welcome</h1>
            {isLoadingBalance && <p>Loading balance...</p>}
            {isConnected && isBalanceFetched && (
                <p>Your balance: {Number(balanceIdleToken) / 1e18} IDLE</p>
            )}
            <form onSubmit={handleSubmit}>
                <Button
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? 'Confirming...' : 'Mint'}
                </Button>
                {isError}
                {isSuccess && isConfirmed && transactionHash && <div>Transaction Hash: {transactionHash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed!</div>}
            </form>
        </div>
    )
}
