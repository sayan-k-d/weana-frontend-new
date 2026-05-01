import EmailSignaturesPage from "@/components/pages/businessAdminDashboard/emailSignatures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Signatures",
};

export default function EmailSignatures() {
  return <EmailSignaturesPage />;
}
