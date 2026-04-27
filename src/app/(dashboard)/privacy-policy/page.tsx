import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PrivacyPolicyPage from "@/components/pages/privacyPolicy";


export const metadata = {
  title: 'Privacy Policy | Weana',
  description: 'Protecting your data while providing a better experience for you.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <PrivacyPolicyPage />
      <Footer />
    </>
  );
}