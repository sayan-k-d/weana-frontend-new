import DirectoryPage from "@/components/pages/businessAdminDashboard/directory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory Dashboard",
};

export default function Directory() {
  return <DirectoryPage />;
}
