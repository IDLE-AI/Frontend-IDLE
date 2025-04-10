import { type Chain } from "viem";

// export const mainnet = {
//   id: 1,
//   name: "Ethereum",
//   nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
//   rpcUrls: {
//     default: { http: ["https://eth.merkle.io"] },
//   },
//   blockExplorers: {
//     default: { name: "Etherscan", url: "https://etherscan.io" },
//   },
//   contracts: {
//     ensRegistry: {
//       address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
//     },
//     ensUniversalResolver: {
//       address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
//       blockCreated: 16773775,
//     },
//     multicall3: {
//       address: "0xca11bde05977b3631167028862be2a173976ca11",
//       blockCreated: 14353601,
//     },
//   },
// } as const satisfies Chain;

export const MantaPacificNetwork = {
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

export const SonicNetwork = {
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

export const LiskNetwork = {
  id: 4202,
  name: "Lisk Sepolia Testnet",
  nativeCurrency: {
    name: "Lisk Sepolia Testnet",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
} as const satisfies Chain;
