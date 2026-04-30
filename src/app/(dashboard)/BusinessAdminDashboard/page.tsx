import BusinessAdminDashboard from "@/components/pages/businessAdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function BusinessAdmin() {
  return <BusinessAdminDashboard />;
}
