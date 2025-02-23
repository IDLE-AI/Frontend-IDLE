import { ShineBorder } from "./magicui/shine-border";


export function DivBorder({ children }: { children: React.ReactNode }) {
    return (
        <ShineBorder
            className="relative size-48 rounded"
            color={["#4a044e", "#d946ef", "#fdf4ff"]}
        >
            {children}
        </ShineBorder>
    );
}
