"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount, useChainId, useReadContract } from "wagmi";
import {
  FactoryTokenABI,
  FactoryTokenAddress,
  FactoryTokenAddressSonic,
} from "@/contracts/FactoryToken";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { ChainConfig } from "@/config/RainbowkitConfig";
import { Badge } from "@/components/ui/badge";

// Define the Token interface
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

export default function AgentsCard() {
  const { isDisconnected } = useAccount();
  const chain = useChainId();
  // Specify the type of AgentData
  const { data: AgentData } = useReadContract({
    address: FactoryTokenAddress,
    abi: FactoryTokenABI,
    functionName: "getAllTokens",
    chainId: chain,
  }) as { data: Token[] };

  const { data: AgentDataSonic } = useReadContract({
    address: FactoryTokenAddressSonic,
    abi: FactoryTokenABI,
    functionName: "getAllTokens",
    chainId: chain,
  }) as { data: Token[] };

  const mergedTokens = [...(AgentData || []), ...(AgentDataSonic || [])];
  const sortedTokens = mergedTokens.sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });

  const chainName = ChainConfig.chains.find((c) => c.id === chain)?.name;
  console.log(chain);
  return (
    <section className="space-y-5">
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Featured" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Creation Time</SelectItem>
          <SelectItem value="dark">Market Cap</SelectItem>
        </SelectContent>
      </Select> */}
      {isDisconnected && (
        <p className="text-muted-foreground text-center">
          <strong>Connect Wallet</strong> to change others Network
        </p>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {sortedTokens?.map((token: Token, index: number) => {
          return (
            <Link href={`/agents/${token.tokenAddress}`} key={index}>
              <Card>
                <CardHeader>
                  <Image
                    src={token.iconURL}
                    width={100}
                    height={100}
                    alt={token.name}
                    priority={true}
                    className="w-full aspect-square rounded object-cover"
                  />
                  {chainName && (
                    <Badge variant="outline">
                      <Image
                        src={
                          chain === 3441006
                            ? "/images/manta.png"
                            : "/images/sonic-logo.png"
                        }
                        width={20}
                        height={20}
                        alt={chainName}
                        priority={true}
                        className="bg-primary rounded-full"
                      />
                      <p className="text-xs font-light">{chainName}</p>
                    </Badge>
                  )}
                  <div>
                    <CardTitle className="">
                      <p>{token.name}</p>
                      <p className="text-sm text-muted-foreground f">
                        ${token.ticker}
                      </p>
                    </CardTitle>
                    <CardDescription className="truncate lowercase font-normal">
                      {token.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-primary text-sm">$0.0005</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">MarketCap</p>
                    <p className="text-primary text-sm">$5.000</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Created at{" "}
                    <span className="text-primary">
                      {moment(Number(token.createdAt) * 1000).fromNow()}
                    </span>
                  </p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
