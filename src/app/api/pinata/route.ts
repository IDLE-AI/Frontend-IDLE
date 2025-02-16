// import { pinata } from "@/utils/config"
// import { NextResponse } from "next/server"

// export async function POST(req) {
//     try {
//         const data = await req.formData()
//         const file = data.get('file')
//         const uploadData = await pinata.upload.file(file)
//         const url = await pinata.gateways.convert(uploadData.IpfsHash)
//         return NextResponse.json(
//             url, {
//             status: 200
//         }
//         )
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 error: "Internal Server Error",
//             }, {
//             status: 500
//         }
//         )
//     }
// }

import { pinata } from "@/config/PinataConfig";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file)
        // Construct the IPFS URL manually since pinata.gateways.convert() seems to return undefined
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${uploadData.IpfsHash}`
        return NextResponse.json(ipfsUrl, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}