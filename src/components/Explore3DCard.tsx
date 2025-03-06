"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import { useReadContract } from "wagmi";
import { FactoryTokenABI, FactoryTokenAddress } from "@/contracts/FactoryToken";
import Image from "next/image";
import moment from "moment";

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

const ReviewCard = ({
  iconURL,
  name,
  ticker,
  description,
  createdAt,
}: {
  iconURL: string;
  name: string;
  ticker: string;
  description: string;
  createdAt: bigint;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row gap-2">
        <Image
          className="aspect-square object-cover"
          width="100"
          height="100"
          alt={name}
          src={iconURL}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">${ticker}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
      <p className="text-xs font-medium text-muted-foreground">
        Created at{" "}
        <span className="text-primary">
          {moment(Number(createdAt) * 1000).fromNow()}
        </span>
      </p>
    </figure>
  );
};

export function Explore3DCard() {
  // Fetch token data
  const { data: AgentData } = useReadContract({
    address: FactoryTokenAddress,
    abi: FactoryTokenABI,
    functionName: "getAllTokens",
    chainId: 3441006,
  }) as { data: Token[] };

  // Sort the tokens by createdAt in descending order
  const sortedTokens = AgentData?.sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });

  // Split tokens into rows
  const firstRow = sortedTokens?.slice(0, sortedTokens.length / 2) || [];
  const secondRow = sortedTokens?.slice(sortedTokens.length / 2) || [];
  const thirdRow = sortedTokens?.slice(0, sortedTokens.length / 2) || [];
  const fourthRow = sortedTokens?.slice(sortedTokens.length / 2) || [];
  const fifthRow = sortedTokens?.slice(0, sortedTokens.length / 2) || [];

  return (
    <div className="relative flex h-[600px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:1000px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((token) => (
            <ReviewCard key={token.tokenAddress} {...token} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((token) => (
            <ReviewCard key={token.tokenAddress} {...token} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((token) => (
            <ReviewCard key={token.tokenAddress} {...token} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((token) => (
            <ReviewCard key={token.tokenAddress} {...token} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fifthRow.map((token) => (
            <ReviewCard key={token.tokenAddress} {...token} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
