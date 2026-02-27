import { 
  Zap, 
  MessageSquare, 
  Image as ImageIcon, 
  CreditCard, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your AI studio today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/chat">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Sparkles className="h-4 w-4" />
              Quick Action
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Tokens Used" 
          value="12,450" 
          change="+12%" 
          description="Since last month"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard 
          title="Images Created" 
          value="84" 
          change="+5%" 
          description="Since last week"
          icon={<ImageIcon className="h-4 w-4" />}
        />
        <StatCard 
          title="Remaining Credits" 
          value="750" 
          change="-150" 
          description="Used today"
          icon={<CreditCard className="h-4 w-4" />}
        />
      </div>

      <h2 className="text-xl font-bold mt-12 mb-6">Quick Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolCard 
          title="AI Conversational Agent"
          description="High-performance text generation for any task."
          icon={<MessageSquare className="h-8 w-8 text-primary" />}
          href="/dashboard/chat"
          color="bg-primary/10"
        />
        <ToolCard 
          title="Image Generator"
          description="Transform text prompts into high-quality imagery."
          icon={<ImageIcon className="h-8 w-8 text-accent" />}
          href="/dashboard/images"
          color="bg-accent/10"
        />
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Link href="/dashboard/history" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all history <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <Card className="glass overflow-hidden border-white/5">
          <div className="divide-y divide-white/5">
            <ActivityItem 
              title="Creative Writing Session" 
              type="Chat" 
              time="2 hours ago" 
              tokens="450"
            />
            <ActivityItem 
              title="Cyberpunk Cityscape" 
              type="Image" 
              time="5 hours ago" 
              tokens="1000"
            />
            <ActivityItem 
              title="Python Debugging Assistant" 
              type="Chat" 
              time="Yesterday" 
              tokens="1,200"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, description, icon }: any) {
  return (
    <Card className="glass border-white/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={cn(change.startsWith('+') ? "text-emerald-500" : "text-amber-500", "font-medium")}>
            {change}
          </span>
          {" "}{description}
        </p>
      </CardContent>
    </Card>
  );
}

function ToolCard({ title, description, icon, href, color }: any) {
  return (
    <Link href={href}>
      <Card className="glass border-white/5 hover:border-primary/50 transition-all group overflow-hidden">
        <CardContent className="p-8 flex items-start gap-6">
          <div className={cn("p-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", color)}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <Button variant="ghost" className="p-0 text-primary group-hover:translate-x-1 transition-transform">
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ActivityItem({ title, type, time, tokens }: any) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          type === "Chat" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
        )}>
          {type === "Chat" ? <MessageSquare className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span>{type}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {time}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold">{tokens} tokens</div>
        <div className="text-xs text-muted-foreground">Usage</div>
      </div>
    </div>
  );
}