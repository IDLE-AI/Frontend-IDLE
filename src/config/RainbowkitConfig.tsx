"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
// import { Contract } from 'ethers'
// import Quoter from '@/abi/Quoter.json'

const client = new QueryClient();

// const MantaPacificNetwork = {
//     id: 169,
//     name: 'Manta Pacific L2 Rollup',
//     nativeCurrency: { name: 'Manta Pacific L2 Rollup', symbol: 'ETH', decimals: 18 },
//     rpcUrls: {
//         default: { http: ['https://pacific-rpc.manta.network/http'] },
//     },

// } as const satisfies Chain;

const MantaPacificNetwork = {
  id: 3441006,
  name: "Manta Pacific Testnet",
  nativeCurrency: {
    name: "Manta Pacific Sepolia Testnet",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://pacific-rpc.sepolia-testnet.manta.network/http"],
    },
  },
} as const satisfies Chain;

const SonicNetwork = {
  id: 57054,
  name: "Sonic Blaze Testnet",
  nativeCurrency: {
    name: "Manta Pacific Sepolia Testnet",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.blaze.soniclabs.com"],
    },
  },
} as const satisfies Chain;

export const ChainConfig = getDefaultConfig({
  appName: "AGHANIM AI",
  projectId: "4c501f56f38d62ce93788345d517592d",
  chains: [SonicNetwork, MantaPacificNetwork],
  ssr: true, // If your dApp uses server side rendering (SSR),
});

export function RainbowkitConfig({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={ChainConfig}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
