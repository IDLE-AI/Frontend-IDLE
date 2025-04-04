// app/api/chat/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { agent } = await request.json();

  try {
    // First, make a POST request to the load endpoint
    const response = await fetch(`http://127.0.0.1:8000/agents/${agent}/load`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json(); // Parse the JSON response

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate response");
    }

    return NextResponse.json({ content: data.status }); // Return the result property from the data
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
