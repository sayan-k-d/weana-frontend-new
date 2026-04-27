import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PricingPage from '@/components/pages/pricing/pricingpage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
};

export default function Pricing() {
  return (
    <>
      <Navbar />
      <PricingPage />
      <Footer />
    </>
  );
}