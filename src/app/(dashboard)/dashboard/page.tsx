import BusinessAdminDashboard from "@/components/pages/dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Admin Dashboard",
};

export default function Home() {
  return <BusinessAdminDashboard />;
}
