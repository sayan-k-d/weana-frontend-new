import SupportPage from '@/components/pages/support';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support',
};

export default function SupportRoutePage() {
  return <SupportPage />;
}
