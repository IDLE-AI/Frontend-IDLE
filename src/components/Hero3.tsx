import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero3() {
  return (
    <div className="h-[40rem] flex flex-col items-center justify-center">
      <TextHoverEffect text="IDLE" />
      <div className="text-center">
        <p className="text-2xl font-semibold">
          Intelligent Decentralized Launchpad Ecosystem
        </p>
        <p className="text-lg">
          Your Complete Protocol Layer for Autonomous AI Agents
        </p>
        <Link
          href="/agents"
          className="flex items-center justify-center mt-5 text-2xl underline underline-offset-4 hover:underline-offset-8 ease-in-out transition-all duration-100  text-muted-foreground group"
        >
          Explore Now{" "}
          <ArrowUpRight
            size={30}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </Link>
      </div>
    </div>
  );
}
