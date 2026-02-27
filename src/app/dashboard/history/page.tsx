"use client";

import { 
  MessageSquare, 
  ImageIcon, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const mockHistory = [
  { id: 1, type: 'chat', title: 'Creative Story Writing', date: '2024-03-24', time: '14:30', tokens: 450 },
  { id: 2, type: 'image', title: 'Cyberpunk landscape with mountains', date: '2024-03-24', time: '11:15', tokens: 1000 },
  { id: 3, type: 'chat', title: 'NextJS API Route Debugging', date: '2024-03-23', time: '18:45', tokens: 1200 },
  { id: 4, type: 'chat', title: 'Product Marketing Copy', date: '2024-03-23', time: '16:20', tokens: 800 },
  { id: 5, type: 'image', title: 'Astronaut in space watercolor', date: '2024-03-22', time: '09:00', tokens: 1000 },
  { id: 6, type: 'chat', title: 'Travel Itinerary for Japan', date: '2024-03-21', time: '21:10', tokens: 1500 },
];

export default function HistoryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Interaction History</h1>
          <p className="text-muted-foreground">Manage and revisit your past AI interactions.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/30 p-4 rounded-2xl border border-white/5 glass">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search your history..." className="pl-10 bg-white/5 border-white/10" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-2 border-white/10">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-white/10">
            <Calendar className="h-4 w-4" /> Date Range
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="chats">Chats Only</TabsTrigger>
          <TabsTrigger value="images">Images Only</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-3">
            {mockHistory.map(item => (
              <HistoryItem key={item.id} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chats" className="mt-6">
          <div className="space-y-3">
            {mockHistory.filter(i => i.type === 'chat').map(item => (
              <HistoryItem key={item.id} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <div className="space-y-3">
            {mockHistory.filter(i => i.type === 'image').map(item => (
              <HistoryItem key={item.id} {...item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HistoryItem({ title, type, date, time, tokens }: any) {
  return (
    <Card className="glass border-white/5 hover:border-primary/50 transition-all cursor-pointer overflow-hidden group">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center",
            type === 'chat' ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
          )}>
            {type === 'chat' ? <MessageSquare className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
          </div>
          <div>
            <h3 className="font-bold text-base">{title}</h3>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {date}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {time}
              </span>
              <span className="text-xs text-primary font-medium">{tokens} Tokens</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gap-2">
            Reopen <ExternalLink className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}