"use client";
import React from "react";
import Image from "next/image";
import BuySell from "@/components/BuySell";
import Transactions from "./Transactions";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { useParams } from "next/navigation";
import {
  FactoryTokenABI,
  FactoryTokenAddress,
  FactoryTokenAddressSonic,
} from "@/contracts/FactoryToken";
import moment from "moment";
import AgentModal from "@/components/AgentModal";
import { BondingProggress } from "@/components/BondingProggress";
import { toast } from "sonner";
import { ChainConfig } from "@/config/RainbowkitConfig";

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

export default function Page() {
  const { ca } = useParams();
  const { isConnected } = useAccount();
  const chain = useChainId();
  const chainId = ChainConfig.chains.find((c) => c.id === chain)?.id;
  const chainName = ChainConfig.chains.find((c) => c.id === chain)?.name;

  const { data: AgentData } = useReadContract({
    address:
      chainId === 11155111 ? FactoryTokenAddress : FactoryTokenAddressSonic,
    abi: FactoryTokenABI,
    functionName: "getTokenByAddress",
    args: [ca],
  }) as { data: Token };

  const copyTextToClipboard = () => {
    if (!navigator.clipboard) {
      toast("Clipboard API not available in your browser.");
      return;
    }

    navigator.clipboard
      .writeText(AgentData.tokenAddress)
      .then(() => {
        // alert();
        toast("Content copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // alert("Failed to copy content to clipboard. Please try again.");
        toast("Failed to copy content to clipboard. Please try again.", {
          description: err,
        });
      });
  };

  if (AgentData?.owner === "0x0000000000000000000000000000000000000000") {
    return (
      <div className="h-[calc(100vh-20vh)] flex flex-col items-center justify-center gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Change Others Network</h1>
          <p className="text-gray-400 font-light">
            you are in <strong>{chainName}</strong> Network
          </p>
        </div>
      </div>
    );
  }

  console.log(AgentData);

  return (
    <main className="xl:m-5 space-y-5 xl:mx-10 2xl:mx-40">
      {AgentData && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="border p-5 xl:col-span-2 flex items-center justify-center">
              {/* <TokenChart /> */}
              <span className="text-muted-foreground">
                {AgentData.name} Chart available soon!
              </span>
            </div>

            {/* Token Info Section */}
            <div className="space-y-5">
              <div className="bg-primary/5 p-3 rounded space-y-5">
                <div className="grid grid-cols-3 gap-5">
                  <Image
                    src={AgentData.iconURL}
                    alt={AgentData.name}
                    width={150}
                    height={150}
                    priority
                    className="aspect-square object-cover rounded"
                  />
                  <div className="col-span-2 space-y-5">
                    <div>
                      <h1 className="text-xl font-bold">{AgentData.name}</h1>
                      <p className="text-sm">$ {AgentData.ticker}</p>

                      <p className="text-xs text-muted-foreground">
                        Created at{" "}
                        <span className="text-primary">
                          {moment(Number(AgentData.createdAt) * 1000).fromNow()}
                        </span>
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="text-primary">$0.0005</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          MarketCap
                        </p>
                        <p className="text-primary">$5.000</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="">{AgentData.description}</p>
                </div>
                <AgentModal AgentData={AgentData} />
              </div>

              {/* Swap Section */}
              <div className="bg-primary/5 rounded p-5 space-y-5">
                <div>
                  <h1 className="text-lg font-bold">Trade {AgentData.name}</h1>
                  <h2 className="text-sm text-muted-foreground font-light">
                    Lets buy and sell {AgentData.name}
                  </h2>
                </div>
                <BuySell AgentData={AgentData} isConnected={isConnected} />
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <section className="grid xl:grid-cols-3 gap-5">
            <div className="bg-primary/5 rounded p-5 col-span-2">
              <h1 className="text-lg font-bold">TRANSACTIONS</h1>
              <Transactions />
            </div>
            <div className="bg-primary/5 rounded p-5 space-y-5 h-fit">
              <div className="space-y-5">
                <h1>
                  Bonding Curve Proggress:{" "}
                  <strong className="text-lg">70%</strong>
                </h1>
                <BondingProggress />
              </div>
              <p className="text-sm text-muted-foreground">
                Graduate this coin to raydium at $55,797 market cap. there is
                3.254 SOL in the bonding curve.
              </p>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <h1 className="text-sm text-muted-foreground">
                    Contract Address:
                  </h1>
                  <p
                    onClick={copyTextToClipboard}
                    className="cursor-pointer hover:underline underline-offset-0 hover:underline-offset-4 transition-all duration-300 ease-in-out"
                  >
                    {ca?.slice(0, 10)}...
                    {ca?.slice(-4)}
                  </p>
                </div>
                <div>
                  <h1 className="text-sm text-muted-foreground">Created by:</h1>
                  <p>
                    {AgentData.owner?.slice(0, 10)}...
                    {AgentData.owner?.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
