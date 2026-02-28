
"use client";

import { useMemo } from "react";
import { 
  DollarSign, 
  Search, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  XCircle,
  ArrowUpRight,
  MoreVertical,
  Calendar
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
import { cn } from "@/lib/utils";
import { useCollection, useFirestore } from "@/firebase";
import { collection } from "firebase/firestore";

export default function AdminPaymentsPage() {
  const db = useFirestore();
  const transactionsRef = useMemo(() => (db ? collection(db, "transactions") : null), [db]);
  const { data: transactions, loading } = useCollection(transactionsRef);

  const totalNet = transactions?.reduce((sum, t) => sum + (t.status === 'Completed' ? t.amount : 0), 0) || 0;
  const activeSubs = transactions?.filter(t => t.status === 'Completed' && t.plan !== 'Starter').length || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-white">Revenue & Billing</h1>
          <p className="text-muted-foreground">Monitoring real-time transactions from Firestore.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 gap-2 h-11 shadow-lg shadow-accent/20">
          <Download className="h-4 w-4" /> Export Financial Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueCard 
          title="Monthly Recurring Revenue" 
          value={`$${(totalNet / 12).toFixed(2)}`} 
          change="Estimated" 
          description="Average MRR based on total"
        />
        <RevenueCard 
          title="Total Net Revenue" 
          value={`$${totalNet.toFixed(2)}`} 
          change="Live" 
          description="Platform lifetime earnings"
        />
        <RevenueCard 
          title="Active Subscriptions" 
          value={activeSubs.toString()} 
          change="Real-time" 
          description="Paying customers"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass border-white/5 p-4 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search transactions by ID or customer email..." 
            className="pl-10 bg-white/5 border-white/10 h-11 focus:border-accent/50 transition-colors text-white"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="gap-2 border-white/10 h-11 text-white">
            <Calendar className="h-4 w-4" /> Date Range
          </Button>
        </div>
      </div>

      <Card className="glass border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Loading transactions...</div>
        ) : transactions && transactions.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5">
                <TableHead className="text-xs font-bold uppercase tracking-wider">Transaction ID</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Customer</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Amount</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Plan</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-accent">{txn.id}</TableCell>
                  <TableCell className="text-sm font-medium text-white">{txn.userEmail || 'Unknown'}</TableCell>
                  <TableCell className="font-bold text-white">${txn.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-white/5 border-none font-bold text-[10px] uppercase">
                      {txn.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {txn.timestamp ? new Date(txn.timestamp).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {txn.status === 'Completed' ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <XCircle className="h-3 w-3 text-rose-500" />
                      )}
                      <span className={cn(
                        "text-xs font-bold uppercase",
                        txn.status === 'Completed' ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {txn.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No transactions recorded</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">Sales data will populate here after the next purchase recorded in Firestore.</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function RevenueCard({ title, value, change, description }: any) {
  return (
    <Card className="glass border-white/5 bg-card/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-headline text-white">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> {change}
          </div>
          <p className="text-[10px] text-muted-foreground italic">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
