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
import Link from "next/link";

export default function SwitchChain() {
  const { chains, switchChain } = useSwitchChain();
  const { chain } = useAccount();

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm">
          Free Testnet Faucet Token
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Available List Faucet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {listFaucet?.map((list) => (
            <Link href={list.link} target="_blank" key={list.name}>
              <DropdownMenuItem>{list.name}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

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

const listFaucet = [
  {
    name: "Sepolia",
    link: "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
  },
  {
    name: "EDU Chain Testnet",
    link: "https://www.hackquest.io/faucets/656476",
  },
  {
    name: "Sonic Blaze Testnet",
    link: "https://testnet.soniclabs.com/account",
  },
];
