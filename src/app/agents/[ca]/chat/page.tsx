"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

export default function Page() {
  const { ca } = useParams();
  const { address } = useAccount();
  return (
    <div>
      CA: {ca}
      User Address: {address}
    </div>
  );
}
