import type { Metadata } from "next";
import IndividualAdminDashboardPage from "@/components/pages/individualAdmin/dashboard";

export const metadata: Metadata = {
  title: "Individual Admin Dashboard",
};

export default function IndividualAdminDashboard() {
  return <IndividualAdminDashboardPage />;
}
