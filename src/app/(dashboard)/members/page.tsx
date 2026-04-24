import MembersPage from "@/components/pages/members";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members Dashboard",
};

export default function Members() {
  return <MembersPage />;
}
