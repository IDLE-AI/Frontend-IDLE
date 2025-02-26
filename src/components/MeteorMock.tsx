import { Meteors } from "./magicui/meteors";

export function MeteorMock({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
            <Meteors number={30} />
            {children}
        </div>
    );
}
