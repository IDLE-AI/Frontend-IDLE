"use client";
import React from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  swapABI,
  // swapAddress,
  // swapAddressEDUChainTestnet,
  swapAddressSonic,
} from "@/contracts/Swap";
import {
  TokenABI,
  // TokenAddress,
  // TokenAddressEduChainTestnet,
  TokenAddressSonic,
} from "@/contracts/Token";
import { parseUnits } from "viem";

export default function Airdrop() {
  const { data: hash, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash || undefined,
    });

  async function addLiq() {
    await writeContractAsync({
      address: TokenAddressSonic,
      abi: TokenABI,
      functionName: "approve",
      args: [swapAddressSonic, parseUnits("3000000", 18)],
    });
    await writeContractAsync({
      address: swapAddressSonic,
      abi: swapABI,
      functionName: "addLiquidity",
      args: [TokenAddressSonic, parseUnits("3000000", 18)],
    });
  }

  return (
    <div>
      <Button disabled={isConfirming} onClick={addLiq}>
        ADD LIQ IDLE
      </Button>
      {isConfirmed && (
        <Button asChild className="rounded" variant={"outline"}>
          <Link
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
          >
            View Transaction Sepolia Explorer
          </Link>
        </Button>
      )}
    </div>
  );
}
