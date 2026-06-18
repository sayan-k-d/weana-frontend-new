import LoginPage from "@/components/pages/auth/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Login() {
  return <LoginPage />;
}
