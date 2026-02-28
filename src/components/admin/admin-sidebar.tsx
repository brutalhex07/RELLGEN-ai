
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Zap, 
  ArrowLeft,
  Activity,
  BarChart3,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: Activity, label: "AI Usage", href: "/admin/usage" },
  { icon: Settings, label: "System Settings", href: "/admin/settings" },
  { icon: ShieldCheck, label: "Security", href: "/admin/security" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-r bg-card/50 backdrop-blur-2xl fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex flex-col gap-4 mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-medium">
            <ArrowLeft className="h-3 w-3" /> Back to User App
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-lg shadow-accent/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold font-headline tracking-tight">Admin Console</span>
          </div>
        </div>

        <nav className="space-y-1">
          {adminNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                pathname === item.href 
                  ? "bg-accent/10 text-accent border border-accent/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}>
                <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-accent" : "group-hover:text-accent")} />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/5 bg-black/10">
        <div className="flex items-center gap-3 px-3 py-4 rounded-xl mb-2">
          <Avatar className="h-10 w-10 border-2 border-accent/50 shadow-lg shadow-accent/10">
            <AvatarImage src="https://picsum.photos/seed/admin/100/100" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">Root Admin</span>
            <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Superuser</span>
          </div>
        </div>
        
        <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">
          v1.0.4-stable
        </div>
      </div>
    </div>
  );
}
