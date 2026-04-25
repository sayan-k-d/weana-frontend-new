import EmailSignaturesPage from "@/components/pages/emailSignatures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Signatures",
};

export default function EmailSignatures() {
  return <EmailSignaturesPage />;
}
