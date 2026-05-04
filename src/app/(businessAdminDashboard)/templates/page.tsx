import TemplatesPage from "@/components/pages/businessAdminDashboard/templates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates Dashboard",
};

export default function Templates() {
  return <TemplatesPage />;
}
