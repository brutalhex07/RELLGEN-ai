
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
  Sparkles,
  Paperclip,
  Mic
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
    { role: "assistant", content: "Hello! I'm your AI assistant. I've been upgraded for better readability and performance. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages, loading]);

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
    <div className="max-w-5xl mx-auto h-[calc(100vh-6rem)] flex flex-col border border-white/10 glass rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 shadow-2xl">
      {/* Header */}
      <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-card/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105 cursor-pointer">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight leading-none mb-1">AI Intelligence Studio</h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active System</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={resetChat} className="hidden sm:flex border-white/10 gap-2 hover:bg-white/5 h-9">
            <RotateCcw className="h-4 w-4" /> New Session
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 sm:px-8 py-8" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-10 pb-10">
          {messages.map((m, i) => (
            <div key={i} className={cn(
              "flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className={cn(
                "h-10 w-10 border-2 mt-1 shrink-0 shadow-sm",
                m.role === "user" ? "border-primary/40" : "border-white/10 bg-card"
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
                "flex flex-col group max-w-[85%]",
                m.role === "user" ? "items-end text-right" : "items-start text-left"
              )}>
                <div className={cn(
                  "px-6 py-4 rounded-[2rem] text-base leading-relaxed shadow-sm transition-all duration-300",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none hover:shadow-primary/10" 
                    : "glass text-foreground/90 rounded-tl-none border-white/10 hover:border-white/20"
                )}>
                  {m.content}
                </div>
                
                <div className={cn(
                  "flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}>
                  <button 
                    onClick={() => copyToClipboard(m.content)}
                    className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/5"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </button>
                  {m.role === "assistant" && (
                    <button className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/5">
                      <RotateCcw className="h-3.5 w-3.5" /> Retry
                    </button>
                  )}
                  <span className="text-[10px] text-muted-foreground/50 tabular-nums">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-6 animate-pulse">
              <Avatar className="h-10 w-10 border border-white/10 bg-card shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary"><Bot /></AvatarFallback>
              </Avatar>
              <div className="px-6 py-4 rounded-[2rem] glass text-foreground rounded-tl-none flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" />
                <span className="text-xs font-medium text-muted-foreground ml-2">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-6 sm:p-10 border-t border-white/5 bg-card/20 backdrop-blur-2xl z-20">
        <div className="relative max-w-4xl mx-auto group">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl group-focus-within:bg-primary/10 transition-colors pointer-events-none" />
          
          <div className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-3xl p-2 transition-all duration-300 focus-within:border-primary/50 focus-within:bg-white/10">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground hover:text-primary hover:bg-white/5 shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 max-h-48 min-h-[48px] py-3 px-2 bg-transparent border-none focus:ring-0 text-base resize-none overflow-hidden scrollbar-none"
              style={{ height: 'auto' }}
              ref={(el) => {
                if (el) {
                  el.style.height = 'auto';
                  el.style.height = el.scrollHeight + 'px';
                }
              }}
            />
            
            <div className="flex items-center gap-1 p-1 shrink-0">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-white/5">
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={cn(
                  "h-10 w-10 rounded-xl p-0 transition-all duration-300 shadow-lg",
                  input.trim() 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-100" 
                    : "bg-white/5 text-muted-foreground scale-95 opacity-50"
                )}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4 opacity-50">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Powered by Gemini 2.0 Flash
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span className="text-[10px] font-medium text-muted-foreground">
            Shift + Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
}
