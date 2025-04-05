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
import SwitchChain from "./SwitchChain";
// import Image from "next/image";

export default function CardSwap() {
  const { isConnected, chainId, chain, address } = useAccount();
  // const { chains, switchChain, chain } = useSwitchChain();
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
        price: 0,
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

  const { data: getEthBalance } = useReadContract({
    address: swapContract as `0x${string}`,
    abi: swapABI,
    functionName: "ethBalance",
    chainId: chainId,
  });

  const { data: getIdleBalance } = useReadContract({
    address: swapContract as `0x${string}`,
    abi: swapABI,
    functionName: "tokenBalances",
    chainId: chainId,
    args: [tokenContract as `0x${string}`],
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

  const {
    data: hash,
    writeContract,
    isSuccess,
    isError: swapError,
    failureReason: swapFailureReason,
  } = useWriteContract();

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

  const insufficientFunds = React.useMemo(() => {
    if (fromToken === listToken[0].address) {
      return Number(amount) > Number(listToken[0].balance);
    }
    if (fromToken === listToken[1].address) {
      return Number(amount) > Number(listToken[1].balance);
    }
    return false;
  }, [amount, fromToken, listToken]);

  React.useEffect(() => {
    if (insufficientFunds) {
      toast.error("Insufficient funds for this transaction.");
    }
  }, [insufficientFunds]);
  // Data input
  const ethBalance = getEthBalance;
  const tokenBalanceA = getIdleBalance;
  const [ethPriceInUSD, setEthPriceInUSD] = React.useState<number>(0);

  React.useEffect(() => {
    async function fetchEthPrice() {
      try {
        const response = await fetch(
          "https://api.g.alchemy.com/prices/v1/uXnyCu-59hxPNS-5USSebL3eum_qHs_p/tokens/by-symbol?symbols=ETH",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // Assuming the price is in the last data point of the chart
        const price = parseFloat(data?.data?.[0]?.prices?.[0]?.value);
        setEthPriceInUSD(price);
      } catch (error) {
        console.error("Failed to fetch ETH price:", error);
      }
    }

    fetchEthPrice();
  }, []); // Konversi ethBalance ke Ether
  const ethBalanceInEther: number = Number(ethBalance) / 1e18;

  // Menghitung harga token dalam ETH
  const priceInETH: number = ethBalanceInEther / Number(tokenBalanceA);

  // Menghitung harga token dalam USD
  const priceInUSD: number = priceInETH * ethPriceInUSD || 0;

  // Menghitung market cap dalam ETH
  const marketCapInETH: number = ethBalanceInEther;

  // Menghitung market cap dalam USD
  const marketCapInUSD: number = marketCapInETH * ethPriceInUSD || 0;

  return (
    <div className="max-w-md w-full">
      <div className="border rounded p-5 space-y-5">
        {isConnected && <SwitchChain />}
        {!isConnected && (
          <p className="text-sm text-muted-foreground text-center">
            <strong>Connect Wallet</strong> to change others Network
          </p>
        )}
        <section className="border p-3 grid xl:grid-cols-3 items-center gap-5 rounded">
          <div className="col-span-2">
            <p className="font-medium">Sell</p>
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

        <section className="border p-3 grid xl:grid-cols-3 items-center gap-5 rounded">
          <div className="col-span-2">
            <p className="font-medium">Buy</p>
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
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            ETH Price:{" "}
            <span className="text-primary">
              {" "}
              {ethPriceInUSD.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </p>
          <p>
            IDLE Price ({chain?.name}):{" "}
            <span className="text-primary">${priceInUSD.toFixed(25)}</span>
          </p>
          <p>
            MarketCap:{" "}
            <span className="text-primary">
              {" "}
              {marketCapInUSD.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </p>
        </div>
        {isConnected ? (
          <Button
            className="w-full rounded"
            onClick={confirmSwap}
            disabled={
              isConfirming || amount === "" || isLoading || insufficientFunds
            }
          >
            {isConfirming ? (
              "Confirming Swap..."
            ) : insufficientFunds ? (
              <p className="text-sm text-red-500">
                Insufficient Balance {getTokenName(fromToken)}
              </p>
            ) : (
              "Swap"
            )}
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
        {swapError && (
          <p className="text-xs text-red-500 text-center line-clamp-2 max-w-sm">
            {String(swapFailureReason)}
          </p>
        )}
        {isConfirmed && isSuccess && (
          <p className="text-sm text-green-500">
            Succesfully swap token from {getTokenName(fromToken)} to{" "}
            {getTokenName(toToken)}
          </p>
        )}
        {isConfirmed && (
          <p className="text-center text-sm text-muted-foreground">
            Transaction Hash: {hash}
          </p>
        )}
      </div>
    </div>
  );
}
