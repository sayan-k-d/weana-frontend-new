import WeanaAdminDashboard from "@/components/pages/weanaAdmin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function BusinessAdmin() {
  return <WeanaAdminDashboard />;
}
