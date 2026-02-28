
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  MessageSquare, 
  Image as ImageIcon, 
  History, 
  CreditCard, 
  Settings, 
  LogOut,
  LayoutGrid,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: MessageSquare, label: "New Chat", href: "/dashboard/chat" },
  { icon: ImageIcon, label: "Image Generator", href: "/dashboard/images" },
  { icon: LayoutGrid, label: "Templates", href: "/dashboard/templates" },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: CreditCard, label: "Pricing", href: "/dashboard/pricing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-r bg-card/30 backdrop-blur-xl fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tight">AI1 Studio</span>
        </Link>

        <Link href="/dashboard/chat">
          <Button className="w-full justify-start gap-2 mb-8 bg-primary hover:bg-primary/90 text-primary-foreground" variant="default">
            <PlusCircle className="h-4 w-4" />
            Start Fresh
          </Button>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary group",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}>
                <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-primary" : "group-hover:text-primary")} />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-4 rounded-xl bg-primary/5 mb-4">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src="https://picsum.photos/seed/user123/100/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">John Doe</span>
            <span className="text-xs text-muted-foreground truncate">j.doe@example.com</span>
          </div>
        </div>

        <div className="px-3 py-3 mb-4 rounded-xl border border-primary/10 bg-primary/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium">Credits</span>
            <span className="text-xs font-bold text-primary">750 / 1000</span>
          </div>
          <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '75%' }} />
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
