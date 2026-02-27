
import { NavSidebar } from "@/components/dashboard/nav-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background dark">
      <NavSidebar />
      <main className="md:ml-64 min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-bg pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
