"use client";
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
            className: "text-[#86198f]",
        },
    ];

    return (
        <TypewriterEffectSmooth words={words} />
    );
}
