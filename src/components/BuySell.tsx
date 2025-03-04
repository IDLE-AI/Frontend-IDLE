import React from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { useReadContract } from "wagmi";
import { TokenABI, TokenAddress } from "@/contracts/Token";

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
  const { data: balanceIdleToken } = useReadContract({
    abi: TokenABI,
    address: TokenAddress,
    functionName: "balanceOf",
    args: [AgentData.owner],
    // Mencegah hook dipanggil sebelum address tersedia
  });

  // const formattedBalance = balanceIdleToken ? Number(balanceIdleToken).toLocaleString() : '0'

  if (!isConnected) {
    return (
      <div className="border rounded p-4">
        <div className="text-center">
          <h1 className="font-semibold">Connect Your Wallet</h1>
          <p className="text-gray-400 font-light text-sm">
            Connect your wallet buy or sell {AgentData.ticker}
          </p>
        </div>
        {/* <WalletButton /> */}
      </div>
    );
  }
  return (
    <>
      {AgentData && (
        <Tabs defaultValue="buy">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground gap-5">
                <h1>Amount (IDLE)</h1>
                {AgentData && (
                  <p>Balance: {Number(balanceIdleToken) / 1e18} IDLE</p>
                )}
              </div>
              <Input
                type="text"
                placeholder="Enter amount to buy"
                className="rounded ease-in-out duration-200"
              />
              <p className="text-sm text-muted-foreground">
                You will receive: 0 {AgentData.ticker}
              </p>
              <Button className="w-full rounded">Confirm Buy</Button>
            </div>
          </TabsContent>
          <TabsContent value="sell">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground gap-5">
                <h1>Amount ({AgentData.ticker}) </h1>
                <p>Balance: 0 {AgentData.ticker}</p>
              </div>
              <Input
                type="text"
                placeholder="Enter amount to sell"
                className="rounded ease-in-out duration-200"
              />
              <p className="text-sm text-muted-foreground">
                You will receive: 0 IDLE
              </p>
              <Button className="w-full rounded">Confirm Sell</Button>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
