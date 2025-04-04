import React, { useRef, useEffect } from "react";
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

// Helper function to format message content with code blocks
const formatMessageContent = (content: string) => {
  if (!content.includes("```")) return <span>{content}</span>;

  const segments = [];
  let currentIndex = 0;
  let codeBlockStart = content.indexOf("```", currentIndex);

  while (codeBlockStart !== -1) {
    // Add text before code block
    if (codeBlockStart > currentIndex) {
      segments.push(
        <span key={`text-${currentIndex}`}>
          {content.slice(currentIndex, codeBlockStart)}
        </span>
      );
    }

    // Find the end of the code block
    const codeBlockEnd = content.indexOf("```", codeBlockStart + 3);
    if (codeBlockEnd === -1) break; // No closing backticks

    // Extract and add the code block
    const codeContent = content.slice(codeBlockStart + 3, codeBlockEnd).trim();
    segments.push(
      <pre
        key={`code-${codeBlockStart}`}
        className="bg-primary/15 text-primary p-3 rounded my-2 overflow-x-auto w-full"
      >
        <code>{codeContent}</code>
      </pre>
    );

    currentIndex = codeBlockEnd + 3;
    codeBlockStart = content.indexOf("```", currentIndex);
  }

  // Add any remaining text after the last code block
  if (currentIndex < content.length) {
    segments.push(
      <span key={`text-${currentIndex}`}>{content.slice(currentIndex)}</span>
    );
  }

  return <>{segments}</>;
};

export default function AgentModal({ AgentData }: { AgentData: Token }) {
  const { address, isConnected } = useAccount();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: `Hello, how can ${AgentData.name} I help you?`,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { role: "user", content: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(""); // Clear input immediately for better UX

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
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "Sorry, I couldn't process your request.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  async function loadAgent() {
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent: "idle ai" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Agent loaded successfully:", data);
    } catch (error) {
      console.error("Failed to load agent:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {AgentData && isConnected && (
          <Button className="rounded" variant={"secondary"} onClick={loadAgent}>
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
          <div className="flex flex-col space-y-4 text-sm">
            {messages.map((msg, index) => (
              <div
                className={`grid ${
                  msg.role === "user"
                    ? "justify-items-end"
                    : "justify-items-start"
                }`}
                key={index}
              >
                <div
                  className={`p-3 rounded max-w-prose ${
                    msg.role === "user"
                      ? "bg-primary text-secondary"
                      : "bg-secondary whitespace-pre-line"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === "assistant" ? (
                      <Avatar className="w-7 h-7 mt-1 flex-shrink-0">
                        <AvatarImage src={AgentData.iconURL} />
                        <AvatarFallback>
                          {AgentData.ticker.charAt(1)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <CircleUserRound className="w-5 h-5 mt-1 flex-shrink-0" />
                    )}
                    <div className="message-content overflow-hidden">
                      {formatMessageContent(msg.content)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />{" "}
            {/* Empty div for scrolling to bottom */}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex mt-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="rounded duration-200 ease-in-out"
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
