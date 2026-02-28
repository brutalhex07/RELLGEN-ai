
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background dark selection:bg-accent/30">
      <AdminSidebar />
      <main className="md:ml-64 min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
