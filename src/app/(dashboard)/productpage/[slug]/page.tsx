import ProductDetail from '@/components/pages/productpage/ProductDetail';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
