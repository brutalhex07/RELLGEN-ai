
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white dark selection:bg-emerald-500/30">
      <AdminSidebar />
      <main className="md:ml-64 min-h-screen relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8">
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
             <div className="flex items-center gap-4">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-500/70">Secure Admin Session Active</span>
             </div>
             <div className="text-[10px] font-mono text-muted-foreground">
               AUTH_LVL: 0_ROOT
             </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
