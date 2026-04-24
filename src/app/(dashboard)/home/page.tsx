import HomePage from "@/components/pages/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function BusinessAdmin() {
  return <HomePage />;
}
