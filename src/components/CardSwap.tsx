"use client";
import {
  swapABI,
  swapAddress,
  swapAddressEDUChainTestnet,
  swapAddressSonic,
} from "@/contracts/Swap";
import React from "react";
import {
  injected,
  useAccount,
  useBalance,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "./ui/button";
import {
  TokenABI,
  TokenAddress,
  TokenAddressEduChainTestnet,
  TokenAddressSonic,
} from "@/contracts/Token";
import { ArrowDownUp, Wallet } from "lucide-react";
import { formatUnits, parseUnits } from "viem";
import { toast } from "sonner";
import Link from "next/link";
// import Image from "next/image";

export default function CardSwap() {
  const { isConnected, chainId, chain, address } = useAccount();
  const { connect } = useConnect();

  const { data: balanceNativeUser } = useBalance({
    address: address,
  });

  const [tokenContract, setTokenContract] =
    React.useState<string>(TokenAddress);
  const [swapContract, setSwapContract] = React.useState<string>(swapAddress);

  React.useEffect(() => {
    if (chainId === 11155111 || chainId === 111_155_111) {
      // Sepolia
      setTokenContract(TokenAddress);
      setSwapContract(swapAddress);
    } else if (chainId === 57054) {
      // Sonic Blaze Testnet
      setTokenContract(TokenAddressSonic);
      setSwapContract(swapAddressSonic);
    } else if (chainId === 656476) {
      // EduChain Testnet
      setTokenContract(TokenAddressEduChainTestnet);
      setSwapContract(swapAddressEDUChainTestnet);
    }
  }, [chainId]);

  const { data: balanceIdleToken } = useReadContract({
    address: tokenContract as `0x${string}`,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  const listToken = React.useMemo(
    () => [
      {
        address: "0x0000000000000000000000000000000000000000",
        name: chain?.nativeCurrency.symbol || "ETH",
        image: "",
        balance: balanceNativeUser ? balanceNativeUser?.formatted : "0",
      },
      {
        address: tokenContract as `0x${string}`,
        name: "IDLE",
        image: "/images/Idle AI_Logomark.png",
        balance: balanceIdleToken
          ? formatUnits(BigInt(balanceIdleToken as bigint), 18)
          : "0",
      },
    ],
    [
      balanceNativeUser,
      balanceIdleToken,
      chain?.nativeCurrency.symbol,
      tokenContract,
    ]
  );

  const [fromToken, setFromToken] = React.useState<string>("");
  const [toToken, setToToken] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [resultCalculate, setResultCalculate] = React.useState<string>("");

  React.useEffect(() => {
    const tokenA = listToken[0].address;
    const tokenB = listToken[1].address;
    setFromToken(tokenA);
    setToToken(tokenB);
  }, [listToken]);

  const {
    data: calculateSwap,
    refetch,
    isLoading,
    isError,
    failureReason,
  } = useReadContract({
    address: swapContract as `0x${string}`,
    abi: swapABI,
    functionName: "calculateSwap",
    chainId: chainId,
    args: [fromToken, toToken, parseUnits(amount, 18)],
  });
  // Debounced function
  const debouncedFetchSwap = React.useCallback(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [refetch]);

  React.useEffect(() => {
    setResultCalculate(calculateSwap as string);
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
  const getTokenBalance = (address: string) => {
    const token = listToken.find((token) => token.address === address);
    return token ? token.balance : " ";
  };

  // const getTokenImage = (address: string) => {
  //   const token = listToken.find((token) => token.address === address);
  //   return token ? token.image : null;
  // };

  const { data: hash, writeContract } = useWriteContract();

  // const isSwapToken =
  //   fromToken === TokenAddress
  //     ? [fromToken, toToken, parseUnits(amount, 18)]
  //     : [amount, fromToken, toToken];

  async function confirmSwap() {
    await writeContract({
      address: tokenContract as `0x${string}`,
      abi: TokenABI,
      functionName: "approve",
      args: [swapContract, parseUnits(amount, 18)],
    });
    await writeContract({
      address: swapContract as `0x${string}`,
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

  return (
    <div className="max-w-md w-full">
      <div className="border rounded p-5 space-y-5">
        <section className="border p-3 grid xl:grid-cols-3 items-center gap-5">
          <div className="col-span-2">
            <p>Sell</p>
            <p className="text-sm text-muted-foreground">
              Balance: {String(getTokenBalance(fromToken))}
            </p>
            <input
              placeholder="Amount"
              className="text-xl py-3 outline-none"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <Button className="rounded w-full">{getTokenName(fromToken)}</Button>
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
            <p className="text-sm text-muted-foreground">
              Balance: {String(getTokenBalance(toToken))}
            </p>
            <input
              className="text-xl py-3 outline-none"
              placeholder={isLoading ? "loading..." : ""}
              value={
                resultCalculate
                  ? formatUnits(
                      BigInt(resultCalculate as unknown as string),
                      18
                    )
                  : ""
              }
              disabled
            />
          </div>
          <Button className="rounded"> {getTokenName(toToken)}</Button>
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
        {isError && <p className="text-xs">{String(failureReason)}</p>}
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
