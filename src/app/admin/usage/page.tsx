
"use client";

import { 
  Activity, 
  Cpu, 
  Zap, 
  Database, 
  HardDrive, 
  BarChart3,
  ArrowUpRight,
  RefreshCcw,
  Bot,
  ImageIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const apiLatencyData = [
  { time: "00:00", latency: 0 },
  { time: "04:00", latency: 0 },
  { time: "08:00", latency: 0 },
  { time: "12:00", latency: 0 },
  { time: "16:00", latency: 0 },
  { time: "20:00", latency: 0 },
  { time: "23:59", latency: 0 },
];

export default function AdminUsagePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-white">AI & Infrastructure Usage</h1>
          <p className="text-muted-foreground">Monitor API health, latency, and token consumption.</p>
        </div>
        <Button variant="outline" className="gap-2 border-white/10 h-11 bg-white/5 text-white">
          <RefreshCcw className="h-4 w-4" /> Refresh Stats
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* API Health */}
        <Card className="glass border-white/5 bg-card/30 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white">Global API Latency</CardTitle>
                <CardDescription>Response time in milliseconds (ms)</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">System Idle</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{ latency: { label: "Latency (ms)", color: "hsl(var(--accent))" } }}>
              <LineChart data={apiLatencyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
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
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Real-time Usage Gauges */}
        <div className="space-y-6">
          <UsageMetricCard 
            title="Chat Tokens (24h)" 
            current="0" 
            limit="20.0M" 
            percent={0} 
            icon={<Bot className="h-4 w-4" />}
          />
          <UsageMetricCard 
            title="Image Tasks (24h)" 
            current="0" 
            limit="15,000" 
            percent={0} 
            icon={<ImageIcon className="h-4 w-4" />}
          />
          <UsageMetricCard 
            title="Compute Load" 
            current="0%" 
            limit="100%" 
            percent={0} 
            icon={<Cpu className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  );
}

function UsageMetricCard({ title, current, limit, percent, icon }: any) {
  return (
    <Card className="glass border-white/5 bg-card/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {icon} {title}
          </div>
          <span className="text-xs font-mono font-bold text-white">{percent}%</span>
        </div>
        <Progress value={percent} className="h-2 bg-white/5" />
        <div className="flex justify-between items-baseline">
          <span className="text-lg font-bold font-headline text-white">{current}</span>
          <span className="text-[10px] text-muted-foreground uppercase">Quota: {limit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
