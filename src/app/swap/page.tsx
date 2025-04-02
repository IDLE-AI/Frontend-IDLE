import CardSwap from "@/components/CardSwap";
import React from "react";

export default function page() {
  return (
    <main className="h-[calc(100vh-20vh)] flex flex-col items-center justify-center gap-5">
      <h1 className="2xl:text-2xl font-medium">Swap Your IDLE Tokens</h1>
      <CardSwap />
    </main>
  );
}
