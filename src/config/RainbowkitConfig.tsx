"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { MantaPacificNetwork, SonicNetwork } from "./chain";
import { liskSepolia } from "viem/chains";
import {
  Chain,
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
// import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";
import "@rainbow-me/rainbowkit/styles.css";
const client = new QueryClient();

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
  appName: "IDLE",
  projectId: "4c501f56f38d62ce93788345d517592d",
  chains: [SonicNetwork, MantaPacificNetwork, liskSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR),
});

// const ChainConfig = defaultConfig({
//   appName: "Xellar",
//   // Required for WalletConnect
//   walletConnectProjectId: "4c501f56f38d62ce93788345d517592d",

//   // Required for Xellar Passport
//   xellarAppId: "0d2248d2-28d7-4a31-9921-312d7bb68b75",
//   xellarEnv: "sandbox",
//   ssr: true, // Use this if you're using Next.js App Router
//   chains: [SonicNetwork, MantaPacificNetwork, liskSepolia],
// }) as Config;

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
        {/* <XellarKitProvider
          theme={darkTheme}
          // Fill this if you want to use Google Auth
          googleClientId="506201553534-8vfsk02dvv07lkchhboibksp61ggu491.apps.googleusercontent.com"
          // Fill this if you want to use Telegram Auth
          // telegramConfig={{
          //   botId: "YOUR_TELEGRAM_BOT_ID",
          //   botUsername: "YOUR_TELEGRAM_BOT_USERNAME",
          // }}
          // Fill this if you want to use Apple Auth
          // appleLoginConfig={{
          //   clientId: "YOUR_APPLE_CLIENT_ID",
          //   redirectUri: "YOUR_REDIRECT_URI",
          // }}
          // Fill this if you want to use Whatsapp Auth
          // enableWhatsappLogin={true}
        >
          {children}
        </XellarKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
