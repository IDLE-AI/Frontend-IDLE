import CardAgent from '@/components/CardAgent'
import Link from 'next/link'
export default function AgentList() {
    return (
        <div className='grid xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
            <Link href="/agents/0xE463b4c1F36163a28bFa8F942248250FcbF58622">
                <CardAgent />
            </Link>
            <Link href="/agents/0xE463b4c1F36163a28bFa8F942248250FcbF58622">
                <CardAgent />
            </Link>
            <Link href="/Linkgents/0xE463b4c1F36163Link28bFLink8F942248250FcbF58622">
                <CardAgent />
            </Link>
            <Link href="/Linkgents/0xE463b4c1F36163Link28bFLink8F942248250FcbF58622">
                <CardAgent />
            </Link>
        </div>
    )
}
