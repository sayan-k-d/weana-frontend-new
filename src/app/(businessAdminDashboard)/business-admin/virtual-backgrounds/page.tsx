import VirtualBgPage from "@/components/pages/businessAdminDashboard/virtualBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Background Dashboard",
};

export default function Templates() {
  return <VirtualBgPage />;
}
