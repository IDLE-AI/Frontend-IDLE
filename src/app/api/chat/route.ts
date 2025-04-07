// app/api/chat/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  try {
    const response = await fetch(
      `https://9baa-2404-8000-1048-6bc-2124-f4cb-b351-fc92.ngrok-free.app/chat`,
      {
        method: "POST", // Missing method specification
        headers: {
          "Content-Type": "application/json", // Missing Content-Type header
        },
        body: JSON.stringify({
          prompt: message,
        }),
      }
    );

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
