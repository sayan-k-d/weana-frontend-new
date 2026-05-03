import CheckoutPage from '@/components/pages/checkout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default function CheckoutRoutePage() {
  return <CheckoutPage />;
}
