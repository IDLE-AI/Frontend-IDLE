"use client";
import { swapABI, swapAddress } from "@/contracts/Swap";
import React from "react";
import {
  injected,
  useAccount,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "./ui/button";
import { TokenABI, TokenAddress } from "@/contracts/Token";
import { ArrowDownUp, Wallet } from "lucide-react";
import { parseUnits } from "viem";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const listToken = [
  {
    address: "0x0000000000000000000000000000000000000000",
    name: "ETH",
    image: "/images/eth.png",
  },
  {
    address: TokenAddress,
    name: "IDLE",
    image: "/images/Idle AI_Logomark.png",
  },
];

export default function CardSwap() {
  const { isConnected, chainId, chain } = useAccount();
  const { connect } = useConnect();
  const [fromToken, setFromToken] = React.useState<string>(
    listToken[0].address
  );

  const [toToken, setToToken] = React.useState<string>(listToken[1].address);
  const [amount, setAmount] = React.useState<string>("");
  const [resultCalculate, setResultCalculate] = React.useState<
    string | number | unknown
  >("");

  const {
    data: calculateSwap,
    refetch,
    isLoading,
  } = useReadContract({
    address: swapAddress,
    abi: swapABI,
    functionName: "calculateSwap",
    args: [fromToken, toToken, parseUnits(amount, 18)],
  });

  // Debounced function
  const debouncedFetchSwap = React.useCallback(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [refetch]);

  React.useEffect(() => {
    setResultCalculate(calculateSwap);
  }, [calculateSwap]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    debouncedFetchSwap();
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const getTokenName = (address: string) => {
    const token = listToken.find((token) => token.address === address);
    return token ? token.name : " ";
  };

  const getTokenImage = (address: string) => {
    const token = listToken.find((token) => token.address === address);
    return token ? token.image : " ";
  };

  const { data: hash, writeContract } = useWriteContract();

  // const isSwapToken =
  //   fromToken === TokenAddress
  //     ? [fromToken, toToken, parseUnits(amount, 18)]
  //     : [amount, fromToken, toToken];

  async function confirmSwap() {
    await writeContract({
      address: TokenAddress,
      abi: TokenABI,
      functionName: "approve",
      args: [swapAddress, parseUnits(amount, 18)],
    });
    await writeContract({
      address: swapAddress,
      abi: swapABI,
      functionName: "swap",
      args: [fromToken, toToken, parseUnits(amount, 18)],
      value: parseUnits(amount, 18),
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash || undefined,
    });

  React.useEffect(() => {
    if (isConfirmed) {
      toast(
        `Swap Succesfully from ${getTokenName(fromToken)} to ${getTokenName(
          toToken
        )}`
      );
    }
  }, [isConfirmed]);

  if (chainId === 57054)
    return (
      <p className="text-muted-foreground">
        Swap on <strong className="text-primary">{chain?.name}</strong>{" "}
        available soon
      </p>
    );

  return (
    <div className="max-w-md w-full">
      <div className="border rounded p-5 space-y-5">
        <section className="border p-3 grid xl:grid-cols-3 items-center gap-5">
          <div className="col-span-2">
            <p>Sell</p>
            <input
              placeholder="Amount"
              className="text-xl py-3 outline-none"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <Button className="rounded">
            <Image
              src={getTokenImage(fromToken)}
              alt="token swap idle"
              width={35}
              height={35}
              priority={true}
            />
            {getTokenName(fromToken)}
          </Button>
        </section>

        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleSwapTokens}
        >
          <ArrowDownUp />
        </div>

        <section className="border p-3 grid xl:grid-cols-3 items-center gap-5">
          <div className="col-span-2">
            <p>Buy</p>

            <input
              className="text-xl py-3 outline-none"
              placeholder={isLoading ? "loading..." : ""}
              value={
                resultCalculate
                  ? (Number(resultCalculate) / 1e18).toLocaleString()
                  : ""
              }
              disabled
            />
          </div>
          <Button className="rounded">
            <Image
              src={getTokenImage(toToken)}
              alt="token swap idle"
              width={35}
              height={35}
              priority={true}
            />
            {getTokenName(toToken)}
          </Button>
        </section>
        {isConnected ? (
          <Button
            className="w-full rounded"
            onClick={confirmSwap}
            disabled={isConfirming || amount === "" || isLoading}
          >
            {isConfirming ? "Confirming Swap..." : "Swap"}
          </Button>
        ) : (
          <Button
            className="w-full rounded"
            variant={"outline"}
            onClick={() => connect({ connector: injected() })}
          >
            <Wallet className="w-10 h-10" />
            Connect Wallet
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center mt-5 gap-3">
        {isConfirmed && (
          <p>
            Succesfully swap token from {getTokenName(fromToken)} to{" "}
            {getTokenName(toToken)}
          </p>
        )}
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
    </div>
  );
}
