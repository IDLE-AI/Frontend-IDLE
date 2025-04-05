import React from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  TokenABI,
  TokenAddress,
  TokenAddressEduChainTestnet,
  TokenAddressSonic,
} from "@/contracts/Token";
import {
  FactoryTokenABI,
  FactoryTokenAddress,
  FactoryTokenAddressEDUChainTestnet,
  FactoryTokenAddressSonic,
} from "@/contracts/FactoryToken";
import { formatUnits, parseUnits } from "viem";
import { toast } from "sonner";

interface Token {
  name: string;
  ticker: string;
  iconURL: string;
  description: string;
  Twitter: string;
  Website: string;
  Behavior: string;
  createdAt: bigint;
  owner: string;
  totalSupply: bigint;
  tokenAddress: string;
}

export default function BuySell({
  AgentData,
  isConnected,
}: {
  AgentData: Token;
  isConnected: boolean;
}) {
  const { address, chainId } = useAccount();
  const [activeTab, setActiveTab] = React.useState<"buy" | "sell">("buy");
  const [amount, setAmount] = React.useState<string>("");

  const [tokenContract, setTokenContract] = React.useState<string>("");
  const [factoryTokenContract, setFactoryTokenContract] =
    React.useState<string>("");

  // Auto switch token address based on chain
  React.useEffect(() => {
    switch (chainId) {
      case 11155111: // Sepolia
      case 111_155_111:
        setTokenContract(TokenAddress);
        setFactoryTokenContract(FactoryTokenAddress);
        break;
      case 57054: // Sonic Blaze
        setTokenContract(TokenAddressSonic);
        setFactoryTokenContract(FactoryTokenAddressSonic);
        break;
      case 656476: // EduChain
        setTokenContract(TokenAddressEduChainTestnet);
        setFactoryTokenContract(FactoryTokenAddressEDUChainTestnet);
        break;
      default:
        setTokenContract("");
        setFactoryTokenContract("");
    }
  }, [chainId]);

  // Balance reads
  const { data: balanceIdleToken } = useReadContract({
    address: tokenContract as `0x${string}`,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: balanceToken } = useReadContract({
    address: AgentData.tokenAddress as `0x${string}`,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  // Swap calculations
  const {
    data: buyCalculation,
    refetch: refetchBuyCalculation,
    isLoading: isLoadingBuyCalculation,
  } = useReadContract({
    address: factoryTokenContract as `0x${string}`,
    abi: FactoryTokenABI,
    functionName: "calculateSwap",
    args: [
      tokenContract,
      AgentData.tokenAddress,
      parseUnits(amount || "0", 18),
    ],
    query: { enabled: false },
  });

  const {
    data: sellCalculation,
    refetch: refetchSellCalculation,
    isLoading: isLoadingSellCalculation,
  } = useReadContract({
    address: factoryTokenContract as `0x${string}`,
    abi: FactoryTokenABI,
    functionName: "calculateSwap",
    args: [
      AgentData.tokenAddress,
      tokenContract,
      parseUnits(amount || "0", 18),
    ],
    query: { enabled: false },
  });

  // Debounced calculation
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!amount || isNaN(Number(amount))) return;

      if (activeTab === "buy") {
        refetchBuyCalculation();
      } else {
        refetchSellCalculation();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [amount, activeTab, refetchBuyCalculation, refetchSellCalculation]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const {
    data: hash,
    writeContract,
    isSuccess,
    isError: swapError,
    failureReason: swapFailureReason,
  } = useWriteContract();

  async function confirmBuy() {
    await writeContract({
      address: tokenContract as `0x${string}`,
      abi: TokenABI,
      functionName: "approve",
      args: [factoryTokenContract, parseUnits(amount, 18)],
    });
    await writeContract({
      address: factoryTokenContract as `0x${string}`,
      abi: FactoryTokenABI,
      functionName: "swapToken",
      args: [
        tokenContract,
        AgentData.tokenAddress,
        parseUnits(amount || "0", 18),
      ],
    });
  }

  async function confirmSell() {
    await writeContract({
      address: AgentData.tokenAddress as `0x${string}`,
      abi: TokenABI,
      functionName: "approve",
      args: [factoryTokenContract, parseUnits(amount, 18)],
    });
    await writeContract({
      address: factoryTokenContract as `0x${string}`,
      abi: FactoryTokenABI,
      functionName: "swapToken",
      args: [
        AgentData.tokenAddress,
        tokenContract,
        parseUnits(amount || "0", 18),
      ],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash || undefined,
    });

  React.useEffect(() => {
    if (isConfirmed && isSuccess) {
      toast(`Swap Succesfull!`);
    }
    if (isConfirmed && swapError) {
      toast.error(`Swap Failed: ${swapFailureReason}`);
    }
  }, [isConfirmed, isSuccess, swapError, swapFailureReason]);

  if (!isConnected) {
    return (
      <div className="border rounded p-4 text-center">
        <h1 className="font-semibold">Connect Your Wallet</h1>
        <p className="text-sm text-gray-400">
          Connect your wallet to buy or sell {AgentData.ticker}
        </p>
      </div>
    );
  }

  const formattedBuy = buyCalculation
    ? formatUnits(BigInt(buyCalculation as bigint), 18)
    : "0";
  const formattedSell = sellCalculation
    ? formatUnits(BigInt(sellCalculation as bigint), 18)
    : "0";

  return (
    <Tabs
      defaultValue="buy"
      onValueChange={(val) => setActiveTab(val as "buy" | "sell")}
    >
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
      </TabsList>

      {/* BUY TAB */}
      <TabsContent value="buy">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <h1>Amount (IDLE)</h1>
            <p className="text-xs">
              Balance:{" "}
              {balanceIdleToken
                ? formatUnits(BigInt(balanceIdleToken as bigint), 18)
                : "0"}{" "}
              IDLE
            </p>
          </div>
          <Input
            type="text"
            placeholder="Enter amount to buy"
            value={amount}
            onChange={handleAmountChange}
          />
          <p className="text-sm text-muted-foreground">
            You will receive:{" "}
            {isLoadingBuyCalculation ? (
              <span>Calculating...</span>
            ) : (
              <span>
                {formattedBuy} {AgentData.ticker}
              </span>
            )}
          </p>
          <Button
            className="w-full"
            disabled={!amount || isConfirming || isLoadingBuyCalculation}
            onClick={confirmBuy}
          >
            {isConfirming ? "Confirming..." : "Confirm Buy"}
          </Button>
          {isConfirmed && isSuccess && <p className="text-sm">Hash:{hash}</p>}
        </div>
      </TabsContent>

      {/* SELL TAB */}
      <TabsContent value="sell">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <h1>Amount ({AgentData.ticker})</h1>
            <p className="text-xs">
              Balance:{" "}
              {balanceToken
                ? formatUnits(BigInt(balanceToken as bigint), 18)
                : "0"}{" "}
              {AgentData.ticker}
            </p>
          </div>
          <Input
            type="text"
            placeholder="Enter amount to sell"
            value={amount}
            onChange={handleAmountChange}
          />
          <p className="text-sm text-muted-foreground">
            You will receive:{" "}
            {isLoadingSellCalculation ? (
              <span>Calculating...</span>
            ) : (
              <span>{formattedSell} IDLE</span>
            )}{" "}
          </p>
          <Button
            className="w-full"
            disabled={!amount || isConfirming}
            onClick={confirmSell}
          >
            {isConfirming ? "Confirming..." : "Confirm Sell"}
          </Button>
          {isConfirmed && isSuccess && (
            <p className="text-sm break-all text-muted-foreground">
              Transaction Hash: <br /> {hash}
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
