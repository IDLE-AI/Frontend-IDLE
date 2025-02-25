import { NextResponse, type NextRequest } from 'next/server';
import ollama from 'ollama';

export async function POST(request: NextRequest) {
    const { message } = await request.json();

    try {
        // const ollama = new Ollama({ host: 'http://127.0.0.1:11434' })
        const response = await ollama.chat({
            model: 'deepseek-coder-v2:16b',
            messages: [{ role: 'user', content: message }],
        })
        return NextResponse.json({ content: response.message.content });
    } catch (error) {
        console.error("Ollama error:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}