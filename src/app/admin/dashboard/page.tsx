
"use client";

import { 
  Users, 
  ImageIcon, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { cn } from "@/lib/utils";

const revenueData = [
  { month: "Jan", revenue: 0, users: 0 },
  { month: "Feb", revenue: 0, users: 0 },
  { month: "Mar", revenue: 0, users: 0 },
  { month: "Apr", revenue: 0, users: 0 },
  { month: "May", revenue: 0, users: 0 },
  { month: "Jun", revenue: 0, users: 0 },
];

const usageData = [
  { day: "Mon", chat: 0, image: 0 },
  { day: "Tue", chat: 0, image: 0 },
  { day: "Wed", chat: 0, image: 0 },
  { day: "Thu", chat: 0, image: 0 },
  { day: "Fri", chat: 0, image: 0 },
  { day: "Sat", chat: 0, image: 0 },
  { day: "Sun", chat: 0, image: 0 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-white">System Overview</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Activity className="h-3 w-3 text-emerald-500" /> Metrics have been reset. Monitoring fresh data.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card/50 border border-white/5 p-1 rounded-xl glass">
          <div className="px-3 py-1 text-xs font-bold text-accent bg-accent/10 rounded-lg">IDLE</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest px-2">Last reset: Just now</span>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard 
          title="Total Users" 
          value="0" 
          change="0%" 
          trend="up"
          description="Total registered accounts"
          icon={<Users className="h-4 w-4" />}
        />
        <AdminStatCard 
          title="Active Today" 
          value="0" 
          change="0%" 
          trend="up"
          description="Users online in last 24h"
          icon={<Activity className="h-4 w-4" />}
        />
        <AdminStatCard 
          title="Revenue Today" 
          value="$0.00" 
          change="0%" 
          trend="up"
          description="Successful transactions"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <AdminStatCard 
          title="AI Tasks" 
          value="0" 
          change="0%" 
          trend="up"
          description="Total generations & chats"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2 glass border-white/5 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg text-white">Revenue Growth</CardTitle>
            <CardDescription>Monthly platform earnings (USD)</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer config={{ 
              revenue: { label: "Revenue", color: "hsl(var(--accent))" },
              users: { label: "New Users", color: "hsl(var(--primary))" } 
            }}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* AI Usage Distribution */}
        <Card className="glass border-white/5 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg text-white">AI Resource Usage</CardTitle>
            <CardDescription>Daily Chat vs Image task volume</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer config={{ 
              chat: { label: "Chat", color: "hsl(var(--primary))" },
              image: { label: "Image", color: "hsl(var(--accent))" } 
            }}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="chat" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="image" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminStatCard({ title, value, change, trend, description, icon }: any) {
  return (
    <Card className="glass border-white/5 bg-card/30 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
        <div className="h-16 w-16 text-accent">
          {icon}
        </div>
      </div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="p-2 bg-accent/10 rounded-lg text-accent shadow-lg shadow-accent/5">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-headline text-white">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className={cn(
            "flex items-center text-xs font-bold px-1.5 py-0.5 rounded",
            trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
            {change}
          </div>
          <p className="text-[10px] text-muted-foreground italic">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
