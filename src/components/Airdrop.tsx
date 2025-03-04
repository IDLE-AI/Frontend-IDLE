"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import WalletButton from "./WalletButton";
import { parseUnits } from "viem";
import { TokenABI, TokenAddress } from "@/contracts/Token";
import { LoaderCircle } from "lucide-react";

export default function Airdrop() {
  const { address, isConnected } = useAccount();

  const { data: balanceIdleToken } = useReadContract({
    address: TokenAddress,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address], // Fallback address
  });

  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  async function submit() {
    writeContract({
      address: TokenAddress,
      abi: TokenABI,
      functionName: "claimToken",
      args: [address, parseUnits("500", 18)],
    });
  }

  return (
    <main className="space-y-5">
      <h1 className="text-5xl text-[#d946ef] font-medium">
        GET $IDLE FOR FREE!
      </h1>
      <h2>
        You can claim 500 $IDLE tokens for free. Just click the button below to
        claim your tokens.
      </h2>
      {isConnected && (
        <p>Your balance: {(Number(balanceIdleToken) / 1e18).toFixed(0)} IDLE</p>
      )}
      {isConnected ? (
        <Button
          type="submit"
          className="self-start"
          size={"lg"}
          disabled={!isConnected || isPending}
          onClick={submit}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              Claiming <LoaderCircle className="animate-spin" />
            </span>
          ) : (
            "Claim 500 IDLE"
          )}
        </Button>
      ) : (
        <WalletButton />
      )}
      {hash && isSuccess && (
        <div className="text-green-500">Transaction success: {hash}</div>
      )}
    </main>
  );
}
