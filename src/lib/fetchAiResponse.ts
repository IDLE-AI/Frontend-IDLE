// This should be in a server-side function or API route
import { Ollama } from "ollama";

export async function FetchAIResponse(newMessage: any) {
    const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });
    const { message } = await ollama.chat({
        model: 'llama3.1',
        messages: [newMessage],
        stream: false
    });
    return message.content;
}
