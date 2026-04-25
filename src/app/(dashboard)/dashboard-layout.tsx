// src/app/(dashboard)/layout.tsx
// This layout wraps all routes inside the (dashboard) group.
// It adds the Sidebar alongside the page content,
// while the root layout still provides Navbar + Footer.

import Sidebar from "@/components/layout/Sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Page content - takes remaining width */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Optional: dashboard-level topbar/breadcrumb can go here */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}