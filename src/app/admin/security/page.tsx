
"use client";

import { 
  ShieldAlert, 
  Lock, 
  Globe, 
  History, 
  UserX, 
  Eye, 
  ShieldCheck,
  Search,
  MoreVertical,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const securityLogs = [
  { id: 1, event: "Suspicious API Activity", user: "mike@ross.co", ip: "192.168.1.45", location: "New York, US", time: "2 mins ago", severity: "High" },
  { id: 2, event: "New Admin Login", user: "root@admin.com", ip: "10.0.0.1", location: "London, UK", time: "15 mins ago", severity: "Info" },
  { id: 3, event: "Multiple Failed Logins", user: "unknown", ip: "172.16.254.1", location: "Moscow, RU", time: "1 hour ago", severity: "Medium" },
  { id: 4, event: "Plan Downgraded", user: "john@doe.com", ip: "192.168.1.10", location: "Paris, FR", time: "3 hours ago", severity: "Info" },
];

export default function AdminSecurityPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Security & Governance</h1>
          <p className="text-muted-foreground italic">Monitor access logs and protect platform integrity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" className="gap-2 font-bold shadow-lg shadow-rose-500/20">
            <UserX className="h-4 w-4" /> Clear All Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SecurityStatCard 
          title="Active Blocks" 
          value="12" 
          icon={<Lock className="h-4 w-4" />} 
          color="text-rose-500"
        />
        <SecurityStatCard 
          title="Login Attempts (24h)" 
          value="1,240" 
          icon={<History className="h-4 w-4" />} 
          color="text-accent"
        />
        <SecurityStatCard 
          title="Security Score" 
          value="98%" 
          icon={<ShieldCheck className="h-4 w-4" />} 
          color="text-emerald-500"
        />
      </div>

      <Card className="glass border-white/5 bg-card/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Audit Logs</CardTitle>
            <CardDescription>Real-time security events across the platform.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-10 bg-white/5 border-white/10 h-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5">
                <TableHead className="text-xs font-bold uppercase tracking-wider">Event</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">User</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">IP Address</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Time</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Severity</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityLogs.map((log) => (
                <TableRow key={log.id} className="border-white/5 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.severity === 'High' && <AlertTriangle className="h-4 w-4 text-rose-500" />}
                      <span className="font-bold text-sm">{log.event}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{log.user}</TableCell>
                  <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "font-bold text-[9px] uppercase",
                      log.severity === 'High' ? "border-rose-500 text-rose-500 bg-rose-500/5" :
                      log.severity === 'Medium' ? "border-amber-500 text-amber-500 bg-amber-500/5" :
                      "border-accent text-accent bg-accent/5"
                    )}>
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurityStatCard({ title, value, icon, color }: any) {
  return (
    <Card className="glass border-white/5 bg-card/30">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
          <h3 className={cn("text-2xl font-bold font-headline", color)}>{value}</h3>
        </div>
        <div className={cn("p-3 rounded-xl bg-white/5", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
