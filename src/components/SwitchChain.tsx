import { useAccount, useSwitchChain } from "wagmi";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function SwitchChain() {
  const { chains, switchChain } = useSwitchChain();
  const { chain } = useAccount();

  return (
    <div className="flex gap-5 items-end justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} variant={"outline"} className="rounded">
            {chain?.name} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Available Networks</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {chains?.map((chain) => (
            <DropdownMenuItem
              key={chain.id}
              onSelect={() => switchChain({ chainId: chain.id })}
            >
              {chain.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
