import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function Roadmap() {
    const data = [
        {
            title: "Q1",
            content: (
                <section className="space-y-5">
                    <h1 className="text-4xl font-bold uppercase">Pre-Launch Phase</h1>
                    <div>
                        <h1 className="text-xl font-medium">
                            Team & Infrastructure Development
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Design and Build technical architecture (smart contracts, AI Agent, Interface, etc).</li>
                            <li>Create a whitepaper detailing tokenomics, roadmap, and use cases.</li>

                        </ul>
                    </div>

                    <div>
                        <h1 className="text-xl font-medium">
                            Initial Community Building
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Launch Telegram Group & Twitter Account.</li>
                            <li>Implement an &quot;Early Adopter&quot; program for users joining the whitelist for the token sale.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium">
                            MVP Prototype Development
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Develop a basic version of the MVP for people can Build, Deploy, Trade, and Interact with AI Agents.</li>
                            <li>Release an interactive demo on the website to showcase technical capabilities.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium">
                            Initial Fundraising
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Raise funds through a private sale to cover initial development costs.</li>
                            <li>Target Minimum $500,000 (depending on development and marketing costs).</li>
                        </ul>
                    </div>
                </section>
            ),
        },
        {
            title: "Q2",
            content: (
                <section className="space-y-5">
                    <h1 className="text-4xl font-bold uppercase">Token Launch & DEX Listing</h1>
                    <div>
                        <h1 className="text-xl font-medium">
                            Launch Token on Website
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Host a Public Sale with a fair launch mechanism</li>
                            <li>Implement lock-up periods for large investors to prevent dumping.</li>

                        </ul>
                    </div>

                    <div>
                        <h1 className="text-xl font-medium">
                            List on DEX
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>List on a reputable DEX with a strong community.</li>
                            <li>Conduct a security audit of smart contracts by a trusted company </li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium">
                            Community Growth
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Launch a "Referral Reward" program to increase Telegram/Twitter members.</li>
                            <li>Collaborate with Web3 influencers to boost visibility.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium">
                            Initial Fundraising
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Raise funds through a private sale to cover initial development costs.</li>
                            <li>Target Minimum $500,000 (depending on development and marketing costs).</li>
                        </ul>
                    </div>
                </section>
            ),
        },
        {
            title: "Q3",
            content: (
                <section className="space-y-5">
                    <h1 className="text-4xl font-bold uppercase">Core Feature Development</h1>
                    <div>
                        <h1 className="text-xl font-medium">
                            Release Feature
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Enable users to build, deploy, and interact with AI Agents in a more intuitive and user-friendly interface.</li>
                            <li>Introduce a &quot;Studio Mode&quot; for advanced users to customize AI Agents with advanced settings.</li>
                            <li>Integrate an NFT Marketplace to simplify buying/selling user-generated content.</li>
                        </ul>
                    </div>

                    <div>
                        <h1 className="text-xl font-medium">
                            Integrate with Other AI Infrastructures
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Integrate with other AI infrastructures to provide a more comprehensive AI experience. (Virtual Protocol, etc)</li>
                            <li>Develop a &quot;Multi-Agent&quot; system to allow users to create and manage multiple AI Agents.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium">
                            Ecosystem Expansion
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Launch a Bug Bounty program to enhance system security.</li>
                            <li>Create a "Developer Portal" to provide resources for building on the platform.</li>
                        </ul>
                    </div>
                </section>
            ),
        },
        {
            title: "Q4",
            content: (
                <section className="space-y-5">
                    <h1 className="text-4xl font-bold uppercase">Ecosystem Expansion</h1>
                    <div>
                        <h1 className="text-xl font-medium">
                            List on CEX
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>List on a reputable CEX to increase visibility and liquidity like Binance, Coinbase, or OKX.</li>

                        </ul>
                    </div>

                    <div>
                        <h1 className="text-xl font-medium">
                            Collaborate with Other Web3 Projects
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Integrate with other AI infrastructures to provide a more comprehensive AI experience. (Virtual Protocol, etc)</li>
                            <li>Run Cross-Promotion campaigns with NFT or GameFi projects.</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-xl font-medium">
                            Announce Next Roadmap
                        </h1>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Examples: Mobile app expansion, VR/AR integration, or advanced AI Agent features.</li>
                        </ul>
                    </div>
                </section>
            ),
        },
    ];
    return (
        <section className="w-full">
            <Timeline data={data} />
        </section>
    );
}
