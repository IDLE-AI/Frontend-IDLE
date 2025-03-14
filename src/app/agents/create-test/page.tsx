import CreateForm from "@/components/CreateForm";
import React from "react";

export default function page() {
  return (
    <main className="py-20 flex flex-col items-center space-y-10">
      <section className="text-center">
        <h1 className="xl:text-4xl 2xl:text-5xl font-bold">
          IDLE AI Agent Creator
        </h1>
        <p className="text-muted-foreground">
          Create and deploy your agent effortlessly in seconds and automatize
          tokenized. Reach the world and scale without limits!
        </p>
      </section>
      <section className="bg-primary/5 p-10 rounded max-w-4xl w-full">
        <CreateForm />
      </section>
    </main>
  );
}
