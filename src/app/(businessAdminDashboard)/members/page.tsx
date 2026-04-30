import MembersPage from "@/components/pages/businessAdminDashboard/members";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members Dashboard",
};

export default function Members() {
  return <MembersPage />;
}
