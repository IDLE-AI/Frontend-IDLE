import React from "react";
import AgentsCard from "../../components/AgentsCard";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="xl:mx-40 2xl:mx-60 ">
      <div className="pt-20 space-y-5">
        <div className="">
          <h1 className="xl:text-4xl 2xl:text-5xl font-bold">
            Build Your Personal AI AGENTS - No Code
          </h1>
          <p className="text-muted-foreground">
            This groundbreaking capability empowers users to construct and
            interact with personalized AI Agents without any coding experience.
          </p>
        </div>
        <Button className="rounded" variant={"secondary"} size="lg">
          BUILD NOW
        </Button>
      </div>
      <hr className="my-10" />
      <AgentsCard />
    </main>
  );
}
