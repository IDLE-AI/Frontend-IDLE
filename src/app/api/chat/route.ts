// app/api/chat/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  try {
    const response = await fetch("http://0.0.0.0:8000/agent/action", {
      method: "POST", // Missing method specification
      headers: {
        "Content-Type": "application/json", // Missing Content-Type header
      },
      body: JSON.stringify({
        // Need to stringify the JSON body
        connection: "openai",
        action: "generate-text",
        params: [
          message, // Use the actual user message instead of hardcoded text
          "You are a helpful AI assistant",
        ],
      }),
    });

    const data = await response.json(); // Parse the JSON response

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate response");
    }

    return NextResponse.json({ content: data.result }); // Return the result property from the data
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
