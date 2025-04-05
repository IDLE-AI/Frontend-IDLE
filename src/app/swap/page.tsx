import CardSwap from "@/components/CardSwap";
import React from "react";

export default function page() {
  return (
    <main className="py-10 flex flex-col items-center justify-center gap-5">
      <h1 className="xl:text-3xl max-w-lg text-center font-light">
        Swap Your IDLE Tokens for a{" "}
        <span className="font-bold">Fast, Secure, and Simple</span> Experience
      </h1>
      <CardSwap />
    </main>
  );
}
