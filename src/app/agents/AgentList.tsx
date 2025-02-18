'use client';
import CardAgent from '@/components/CardAgent';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useReadContract } from 'wagmi';

// 1. Definisikan interface TokenInfo dan tipe return
interface TokenInfo {
    name: string;
    symbol: string;
    totalSupply: bigint;
    owner: string;
    createdAt: bigint;
    iconUrl: string;
    description: string;
    behaviour: string;
    openPrice: bigint;
    highPrice: bigint;
    lowPrice: bigint;
    closePrice: bigint;
}

type GetAllIssueReturn = [
    TokenInfo[],  // array of TokenInfo
    string[],     // array of addresses
    bigint[],
];

// 2. ABI
const contractABI = [
    {
        "inputs": [],
        "name": "getAllIssue",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "symbol", "type": "string" },
                    { "internalType": "uint256", "name": "totalSupply", "type": "uint256" },
                    { "internalType": "address", "name": "owner", "type": "address" },
                    { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
                    { "internalType": "string", "name": "iconUrl", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "string", "name": "behaviour", "type": "string" },
                    { "internalType": "uint256", "name": "openPrice", "type": "uint256" },
                    { "internalType": "uint256", "name": "highPrice", "type": "uint256" },
                    { "internalType": "uint256", "name": "lowPrice", "type": "uint256" },
                    { "internalType": "uint256", "name": "closePrice", "type": "uint256" }
                ],
                "internalType": "struct FactoryExchange.TokenInfo[]",
                "name": "",
                "type": "tuple[]"
            },
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// 3. Alamat kontrak
const contractAddress = '0x116Aac1D95f32D699ABaf48a781BE83b8c4F8b43';

export default function AgentList() {
    // 4. Gunakan generic agar data bertipe GetAllIssueReturn
    const { data, isError, isLoading, error } = useReadContract({
        abi: contractABI,
        address: contractAddress,
        functionName: 'getAllIssue',
    }) as {
        data: GetAllIssueReturn | undefined;
        isError: boolean;
        isLoading: boolean;
        error: Error | null;
    };

    // Logging
    useEffect(() => {
        console.log('Fetched data:', data);
        if (error) {
            console.error('Error detail:', error);
        }
    }, [data, error]);

    return (
        <div style={{ padding: '2rem' }}>
            {/* <ConnectButton /> */}
            <h1>Data Token</h1>

            {isLoading && <p>Loading...</p>}

            {isError && (
                <p style={{ color: 'red' }}>
                    Error saat mengambil data: {error ? error.message : 'Unknown error'}
                </p>
            )}

            {/* 5. Render data jika ada */}
            {data ? (
                <div>
                    <h2>Daftar Token</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data[0].map((token: TokenInfo, index: number) => (
                            <CardAgent
                                key={index}
                                id={String(data[2][index])}
                                name={token.name}
                                ticker={token.symbol}
                                price={Number(token.closePrice)}
                                marketCap={Number(token.totalSupply) * Number(token.closePrice)}
                                imageUrl={token.iconUrl}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Data belum tersedia.</p>
            )}
        </div>
    );
}
