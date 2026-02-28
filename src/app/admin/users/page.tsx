
"use client";

import { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Shield, 
  Mail, 
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Edit,
  Trash2,
  Unlock,
  Lock,
  Zap
} from "lucide-react";
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockUsers: any[] = [];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-white">User Management</h1>
          <p className="text-muted-foreground">Manage accounts, plans, and credit distributions.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 gap-2 shadow-lg shadow-accent/20">
          <UserPlus className="h-4 w-4" /> Add New User
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass border-white/5 p-4 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, email, or user ID..." 
            className="pl-10 bg-white/5 border-white/10 h-11 focus:border-accent/50 transition-colors text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="gap-2 border-white/10 h-11 text-white">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2 border-white/10 h-11 text-white">
            <Zap className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="glass border-white/5 overflow-hidden">
        {mockUsers.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5">
                <TableHead className="w-[300px] text-xs font-bold uppercase tracking-wider">User</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Plan</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Credits</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">Joined</TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-white">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "font-bold text-[10px] uppercase",
                      user.plan === 'Enterprise' ? "border-accent text-accent bg-accent/5" : 
                      user.plan === 'Pro' ? "border-primary text-primary bg-primary/5" : ""
                    )}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-mono font-bold tracking-tight text-white">{user.credits.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">Tokens</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.status === 'Active' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-500" />
                      )}
                      <span className={cn(
                        "text-xs font-medium",
                        user.status === 'Active' ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {user.joined}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-white/10 w-48">
                        <DropdownMenuLabel>User Options</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" /> Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Zap className="h-4 w-4 text-accent" /> Manage Credits
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Shield className="h-4 w-4 text-primary" /> Change Plan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        {user.status === 'Active' ? (
                          <DropdownMenuItem className="gap-2 text-rose-500 focus:text-rose-500 cursor-pointer">
                            <Lock className="h-4 w-4" /> Block User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="gap-2 text-emerald-500 focus:text-emerald-500 cursor-pointer">
                            <Unlock className="h-4 w-4" /> Unblock User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 cursor-pointer">
                          <Trash2 className="h-4 w-4" /> Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No users found</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">All user accounts have been reset. New accounts will appear here as they register.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
