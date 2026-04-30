import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TermsOfServicePage from "@/components/pages/base-page/termsOfServices";


export const metadata = {
  title: 'Terms of Service | Weana',
  description: 'Protecting your data while providing a better experience for you.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <TermsOfServicePage />
      <Footer />
    </>
  );
}