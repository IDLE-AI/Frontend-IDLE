"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import WalletButton from "./WalletButton";
import { parseUnits } from "viem";
import { TokenABI, TokenAddress, TokenAddressSonic } from "@/contracts/Token";
import { LoaderCircle } from "lucide-react";
import { ChainConfig } from "@/config/RainbowkitConfig";
import Link from "next/link";

export default function Airdrop() {
  const { address, isConnected } = useAccount();
  const chain = useChainId();
  const chainId = ChainConfig.chains.find((c) => c.id === chain)?.id;

  // Fetch balances
  const { data: balanceIdleToken } = useReadContract({
    address: TokenAddress,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: balanceIdleTokenSonic } = useReadContract({
    address: TokenAddressSonic,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  // Fetch whitelist status for both contracts unconditionally
  const { data: whitelistManta } = useReadContract({
    address: TokenAddress,
    abi: TokenABI,
    functionName: "whitelist",
    args: [address],
  });

  const { data: whitelistSonic } = useReadContract({
    address: TokenAddressSonic,
    abi: TokenABI,
    functionName: "whitelist",
    args: [address],
  });

  // Determine eligibility based on the current chainId
  const isEligible =
    (chainId === 3441006 && whitelistManta) ||
    (chainId === 57054 && whitelistSonic);

  const submit = async () => {
    const tokenAddress = chainId === 3441006 ? TokenAddress : TokenAddressSonic;
    if (tokenAddress) {
      try {
        await writeContract({
          address: tokenAddress,
          abi: TokenABI,
          functionName: "approve",
          args: [address, parseUnits("500", 18)],
        });
        await writeContract({
          address: tokenAddress,
          abi: TokenABI,
          functionName: "claimToken",
          args: [address, parseUnits("500", 18)],
        });
      } catch (error) {
        console.error("Error claiming tokens:", error);
      }
    }
  };

  const balance = Number(balanceIdleToken || balanceIdleTokenSonic) / 1e18;

  return (
    <main className="space-y-5">
      {isConnected && (
        <div>
          <p>Your balance: {balance.toFixed(0)} IDLE</p>
          <p
            className={`font-light ${
              isEligible ? "text-green-500" : "text-red-500"
            } text-sm`}
          >
            {isEligible
              ? "You are in whitelist, can claim IDLE Token"
              : "Sorry, you are not eligible to claim IDLE Token"}
          </p>
        </div>
      )}

      <div>
        <h1 className="text-5xl font-bold">GET $IDLE FOR FREE!</h1>
        <p className="text-muted-foreground">
          You can claim 500 $IDLE tokens for free. Just click the button below
          to claim your tokens.
        </p>
      </div>

      {isConnected ? (
        <Button
          type="submit"
          className="rounded"
          size="lg"
          disabled={!isConnected || isPending || !isEligible}
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
        <div className="border py-5 rounded bg-secondary/10 space-y-3">
          <p>Transaction success</p>
          <Button asChild className="rounded" variant="outline">
            <Link
              href={
                chainId === 3441006
                  ? `https://pacific-explorer.sepolia-testnet.manta.network/tx/${hash}`
                  : `https://testnet.sonicscan.org/tx/${hash}`
              }
              target="_blank"
            >
              View Transaction {chainId === 3441006 ? "Manta" : "Sonic"}{" "}
              Explorer
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}
