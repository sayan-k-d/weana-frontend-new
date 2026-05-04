import ResetPasswordPage from "@/components/pages/auth/reset-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function ResetPassword() {
  return <ResetPasswordPage />;
}
