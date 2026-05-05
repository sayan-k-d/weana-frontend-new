import TeamsPage from "@/components/pages/businessAdminDashboard/teams";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams Dashboard",
};

export default function Teams() {
  return <TeamsPage />;
}
