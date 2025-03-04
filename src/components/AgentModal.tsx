import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CircleUserRound, LoaderCircle, SendHorizontal } from "lucide-react";
import { useAccount } from "wagmi";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";

interface Token {
  name: string;
  ticker: string;
  iconURL: string;
  description: string;
  Twitter: string;
  Website: string;
  Behavior: string;
  createdAt: bigint;
  owner: string;
  totalSupply: bigint;
  tokenAddress: string;
}

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function AgentModal({ AgentData }: { AgentData: Token }) {
  const { address, isConnected, isDisconnected } = useAccount();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: `Hello, how can ${AgentData.name} I help you?`,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { role: "user", content: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        setLoading(true);
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: data.content },
          ]);
        } else {
          throw new Error(data.error);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "Sorry, I couldn't process your request.",
          },
        ]);
        setInput("");
        setLoading(false);
      } finally {
        setInput("");
        setLoading(false);
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {AgentData && isConnected && (
          <Button className="rounded" variant={"secondary"}>
            Interact {AgentData.name}
          </Button>
        )}
      </DialogTrigger>
      {!isConnected && (
        <p className="text-sm text-muted-foreground capitalize">
          <strong>connect wallet</strong> for interact with {AgentData.name}
        </p>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={AgentData.iconURL} />
              <AvatarFallback>{AgentData.ticker.charAt(1)}</AvatarFallback>
            </Avatar>
            {AgentData.name}
            <span className="font-light">AI AGENT</span>
          </DialogTitle>
          <DialogDescription className="text-primary">
            {AgentData.description}.
          </DialogDescription>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <CircleUserRound /> {address?.slice(0, 5)}...{address?.slice(-4)}{" "}
            (You)
          </div>
        </DialogHeader>
        <hr />
        <ScrollArea className="h-96 pr-4">
          {messages.map((msg, index) => (
            <div className="grid" key={index}>
              <p
                key={index}
                className={`my-2 p-2 rounded font-light text-sm break-all flex items-center gap-2 ${
                  msg.role === "user"
                    ? " bg-primary text-secondary place-self-end max-w-sm"
                    : "bg-secondary place-self-start max-w-sm"
                }`}
              >
                {msg.role === "assistant" && (
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={AgentData.iconURL} />
                    <AvatarFallback>
                      {AgentData.ticker.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                )}{" "}
                {msg.role === "user" && <CircleUserRound />} {msg.content}
              </p>
            </div>
          ))}
        </ScrollArea>
        {/* <div className="flex flex-col h-96 overflow-y-auto p-4  rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg ${
                msg.role === "user"
                  ? " bg-primary text-secondary self-end"
                  : "bg-secondary self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div> */}
        <form onSubmit={handleSubmit} className="flex mt-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="rounded  duration-200 ease-in-out"
            disabled={loading}
          />
          <Button
            type="submit"
            className="ml-2 rounded"
            disabled={loading || input === ""}
            size={"icon"}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <SendHorizontal />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
