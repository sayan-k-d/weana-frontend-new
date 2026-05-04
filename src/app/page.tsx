import BasePage from "@/components/pages/base-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weana',
};

export default function Home() {
  return <BasePage />;
}
