
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Activity,
  ArrowLeft,
  LogOut,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const adminNavItems = [
  { icon: LayoutDashboard, label: "System Overview", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: CreditCard, label: "Revenue & Billing", href: "/admin/payments" },
  { icon: Activity, label: "AI Usage Metrics", href: "/admin/usage" },
  { icon: Settings, label: "Global Settings", href: "/admin/settings" },
  { icon: ShieldCheck, label: "Security & Logs", href: "/admin/security" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-r border-emerald-500/10 bg-[#0a0a0b] fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex flex-col gap-4 mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-tighter">
            <ArrowLeft className="h-3 w-3" /> Return to Studio
          </Link>
          <div className="flex items-center gap-2 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <Terminal className="h-5 w-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-headline tracking-tight text-white leading-none">Admin</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Command Center</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {adminNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group border",
                pathname === item.href 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-sm" 
                  : "text-muted-foreground border-transparent hover:bg-white/5 hover:text-foreground"
              )}>
                <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-emerald-500" : "group-hover:text-emerald-500")} />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/5 bg-black/40">
        <div className="flex items-center gap-3 px-3 py-4 rounded-xl mb-4 bg-emerald-500/5 border border-emerald-500/10">
          <Avatar className="h-10 w-10 border-2 border-emerald-500/50">
            <AvatarImage src="https://picsum.photos/seed/admin-root/100/100" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate text-white">System Root</span>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Superuser</span>
          </div>
        </div>
        
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 rounded-xl">
          <LogOut className="h-4 w-4" />
          Terminal Exit
        </Button>

        <div className="mt-4 px-3 py-1 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] text-center">
          Kernel 1.0.4-S
        </div>
      </div>
    </div>
  );
}
