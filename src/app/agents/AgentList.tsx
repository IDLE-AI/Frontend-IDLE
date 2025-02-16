import CardAgent from '@/components/CardAgent'
import Link from 'next/link'

interface Agent {
    id: string;
    name: string;
    ticker: string;
    price: number;
    marketCap: number;
    imageUrl: string;
}

export default function AgentList() {
    // This could come from an API or props
    const agents: Agent[] = [
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
        // Add more agents as needed
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
        {
            id: '0xE463b4c1F36163a28bFa8F942248250FcbF58622',
            name: 'AI Agent 1',
            ticker: '$AGT1',
            price: 0.000100,
            marketCap: 99900,
            imageUrl: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/meme-pepe-ok.jpg'
        },
    ]

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5'>
            {agents.map((agent, index) => (
                <Link key={index} href={`/agents/${agent.id}`}>
                    <CardAgent {...agent} />
                </Link>
            ))}
        </div>
    )
}
