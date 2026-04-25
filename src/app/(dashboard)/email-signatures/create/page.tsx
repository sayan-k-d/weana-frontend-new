import CreateEmailSignaturePage from "@/components/pages/emailSignatures/create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Email Signature",
};

export default function CreateEmailSignature() {
  return <CreateEmailSignaturePage />;
}
