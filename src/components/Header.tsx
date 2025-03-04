"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import WalletButton from "./WalletButton";
import { BookOpen, Earth } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center gap-5 xl:mx-40 2xl:mx-60 p-5">
      <Link href="/">
        <Image
          src="/images/idle-logo-primary.png"
          alt="logo"
          width={75}
          height={75}
        />
      </Link>
      <nav className="space-x-5 ">
        <Link
          href="/agents/create"
          className={`${
            pathname === "/agents/create"
              ? "text-primary underline underline-offset-4"
              : "text-muted-foreground hover:text-primary duration-300 ease-in-out hover:underline underline-offset-0 hover:underline-offset-4"
          }`}
        >
          Create
        </Link>
        <Link
          href="/agents"
          className={`${
            pathname === "/agents"
              ? "text-primary underline underline-offset-4"
              : "text-muted-foreground hover:text-primary duration-300 ease-in-out hover:underline underline-offset-0 hover:underline-offset-4"
          }`}
        >
          Agents
        </Link>
        <Link
          href="/studio"
          className={`${
            pathname === "/studio"
              ? "text-primary underline underline-offset-4"
              : "text-muted-foreground hover:text-primary duration-300 ease-in-out hover:underline underline-offset-0 hover:underline-offset-4"
          }`}
        >
          Studio
        </Link>
      </nav>
      {/* <nav className={`${pathname === "/" ? "justify-self-end" : "hidden"}`}> */}
      {/* <div className="ml-auto"> */}
      <nav className={`${pathname === "/" ? "hidden" : "ml-auto"}`}>
        <WalletButton />
      </nav>

      <nav className={`${pathname === "/" ? "ml-auto" : "hidden"}`}>
        <div>
          <Link
            href={"https://amelias-organization-20.gitbook.io/idle"}
            target="_blank"
            className="flex items-center gap-2"
          >
            <BookOpen />
            docs
          </Link>
        </div>
      </nav>
      {/* </div> */}
    </header>
  );
}
