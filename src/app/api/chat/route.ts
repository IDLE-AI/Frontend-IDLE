// app/api/chat/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  try {
    const response = await fetch(`http://127.0.0.1:8000/chat`, {
      method: "POST", // Missing method specification
      headers: {
        "Content-Type": "application/json", // Missing Content-Type header
      },
      body: JSON.stringify({
        prompt: message,
      }),
    });

    const data = await response.json(); // Parse the JSON response

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate response");
    }

    return NextResponse.json({ content: data.response }); // Return the result property from the data
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
