'use client'
import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
// import { Contract } from 'ethers'
// import Quoter from '@/abi/Quoter.json'

const client = new QueryClient();

const MantaPacificNetwork = {
    id: 169,
    name: 'Manta Pacific L2 Rollup',
    nativeCurrency: { name: 'Manta Pacific L2 Rollup', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://pacific-rpc.manta.network/http'] },
    },

} as const satisfies Chain;

const RainbowKitconfig = getDefaultConfig({
    appName: 'AGHANIM AI',
    projectId: '4c501f56f38d62ce93788345d517592d',
    chains: [MantaPacificNetwork],
    ssr: true, // If your dApp uses server side rendering (SSR),
});

// const config = createConfig({
//     chains: [MantaPacificNetwork],
//     transports: {
//         [MantaPacificNetwork.id]: http('https://pacific-rpc.manta.network/http'),
//         Contract: {
//             quoter: {
//                 address: '0x3005827fB92A0cb7D0f65738D6D645d98A4Ad96b', // Quoter Address
//                 abi: Quoter,
//             },
//         }
//     },
//     ssr: true,
// })

export function RainbowkitConfig({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={RainbowKitconfig} >
            <QueryClientProvider client={client}>
                <RainbowKitProvider modalSize="compact" theme={darkTheme({
                    accentColor: '#7b3fe4',
                    accentColorForeground: 'white',
                    borderRadius: 'small',
                    fontStack: 'system',
                    overlayBlur: 'small',
                })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
