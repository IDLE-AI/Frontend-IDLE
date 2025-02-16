"use client";

import { Button } from "./ui/button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function HookTypewriter() {
    const words = [
        {
            text: "COMING",
        },
        {
            text: "SOON",
        },
        {
            text: "🚀",
        },
        {
            text: "UNDER",
        },
        {
            text: "DEVELOPMENT",
            className: "text-[#e879f9]",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-[40rem] gap-4">
            <TypewriterEffectSmooth words={words} />
            <p className="text-muted-foreground">Our AI AGENTS feature for <strong>STUDIO MODE</strong> is currently under development</p>
            <div className="rounded-full bg-primary/50 cursor-not-allowed px-4 py-2">
                AVAILABLE SOON
            </div>
        </div>
    );
}
