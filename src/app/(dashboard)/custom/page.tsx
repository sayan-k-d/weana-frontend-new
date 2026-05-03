import CustomPage from '@/components/pages/custom';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom',
};

export default function CustomRoutePage() {
  return <CustomPage />;
}
