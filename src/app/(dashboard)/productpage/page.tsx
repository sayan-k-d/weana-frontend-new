import ProductPage from '@/components/pages/productpage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Page',
};

export default function ProductPageRoute() {
  return <ProductPage />;
}
