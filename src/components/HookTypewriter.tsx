"use client";

import { Button } from "./ui/button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function HookTypewriter() {
    const words = [
        {
            text: "START",
        },
        {
            text: "BUILDING",
        },
        {
            text: "YOUR",
        },
        {
            text: "AI AGENTS",
            className: "text-[#e879f9]",
        },
        {
            text: "TODAY.",
        },
    ];
    // Start building your AI agents today
    return (
        <div className="flex flex-col items-center justify-center h-[40rem]">
            <TypewriterEffectSmooth words={words} />
            <Button size={'lg'} className="rounded bg-[#e879f9]">
                GETTING STARTED
            </Button>
        </div>
    );
}
