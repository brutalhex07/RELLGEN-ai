"use client";

import { useMemo } from "react";
import { 
  Users, 
  ImageIcon, 
  MessageSquare, 
  Activity,
  DollarSign, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
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
import { useCollection, useFirestore } from "@/firebase";
import { collection } from "firebase/firestore";

export default function AdminDashboardPage() {
  const db = useFirestore();

  const usersRef = useMemo(() => (db ? collection(db, "users") : null), [db]);
  const transactionsRef = useMemo(() => (db ? collection(db, "transactions") : null), [db]);
  const usageRef = useMemo(() => (db ? collection(db, "usage_logs") : null), [db]);

  const { data: users } = useCollection(usersRef);
  const { data: transactions } = useCollection(transactionsRef);
  const { data: usageLogs } = useCollection(usageRef);

  const totalRevenue = transactions?.reduce((sum, t) => sum + (t.status === 'Completed' ? t.amount : 0), 0) || 0;
  const totalTasks = usageLogs?.length || 0;
  const activeToday = users?.filter(u => u.status === 'Active').length || 0;

  // Chart Data preparation
  const usageData = [
    { day: "Mon", chat: usageLogs?.filter(l => l.type === 'chat').length || 0, image: usageLogs?.filter(l => l.type === 'image').length || 0 },
    { day: "Tue", chat: 0, image: 0 },
    { day: "Wed", chat: 0, image: 0 },
    { day: "Thu", chat: 0, image: 0 },
    { day: "Fri", chat: 0, image: 0 },
    { day: "Sat", chat: 0, image: 0 },
    { day: "Sun", chat: 0, image: 0 },
  ];

  const revenueData = [
    { month: "Jan", revenue: totalRevenue },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-white">System Overview</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Activity className="h-3 w-3 text-emerald-500" /> Real-time metrics connected to Firestore.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card/50 border border-white/5 p-1 rounded-xl glass">
          <div className="px-3 py-1 text-xs font-bold text-accent bg-accent/10 rounded-lg">LIVE</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest px-2">Syncing with database</span>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard 
          title="Total Users" 
          value={users?.length.toString() || "0"} 
          change="Live" 
          trend="up"
          description="Total registered accounts"
          icon={<Users className="h-4 w-4" />}
        />
        <AdminStatCard 
          title="Active Users" 
          value={activeToday.toString()} 
          change="Current" 
          trend="up"
          description="Users with Active status"
          icon={<Activity className="h-4 w-4" />}
        />
        <AdminStatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`} 
          change="Accumulated" 
          trend="up"
          description="All completed transactions"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <AdminStatCard 
          title="AI Tasks" 
          value={totalTasks.toString()} 
          change="Total" 
          trend="up"
          description="Generations & chats logged"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2 glass border-white/5 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg text-white">Revenue Growth</CardTitle>
            <CardDescription>Real-time platform earnings (USD)</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer config={{ 
              revenue: { label: "Revenue", color: "hsl(var(--accent))" }
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
            <CardDescription>Live Chat vs Image task volume</CardDescription>
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
