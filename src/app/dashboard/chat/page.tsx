
"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  User, 
  Bot, 
  Copy, 
  RotateCcw, 
  MoreHorizontal,
  PlusCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAiChatResponse } from "@/ai/flows/ai-chat-response-generation-flow";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await generateAiChatResponse({ prompt: input });
      const aiMessage: Message = { role: "assistant", content: result.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: "Copied to clipboard!" });
  };

  const resetChat = () => {
    setMessages([{ role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col border border-white/10 glass rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-card/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold leading-none">AI Assistant</h2>
            <span className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={resetChat} title="Reset Chat">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
        <div className="space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={cn(
              "flex gap-4",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className={cn(
                "h-10 w-10 border",
                m.role === "user" ? "border-primary/20" : "border-white/10 bg-card"
              )}>
                {m.role === "user" ? (
                  <>
                    <AvatarImage src="https://picsum.photos/seed/user123/100/100" />
                    <AvatarFallback><User /></AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary"><Bot /></AvatarFallback>
                )}
              </Avatar>
              
              <div className={cn(
                "flex flex-col max-w-[80%] group",
                m.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "glass text-foreground rounded-tl-none"
                )}>
                  {m.content}
                </div>
                
                <div className={cn(
                  "flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}>
                  <button 
                    onClick={() => copyToClipboard(m.content)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                  {m.role === "assistant" && (
                    <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                      <RotateCcw className="h-3 w-3" /> Regenerate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 border border-white/10 bg-card">
                <AvatarFallback className="bg-primary/10 text-primary"><Bot /></AvatarFallback>
              </Avatar>
              <div className="px-4 py-3 rounded-2xl glass text-foreground rounded-tl-none max-w-[80%] flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/5 bg-card/10 backdrop-blur-md">
        <div className="relative max-w-3xl mx-auto">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message here..."
            className="pr-24 py-6 bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary h-14"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 h-10 px-4 gap-2"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </Button>
          </div>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-3">
          AI may produce inaccurate information about people, places, or facts.
        </p>
      </div>
    </div>
  );
}
