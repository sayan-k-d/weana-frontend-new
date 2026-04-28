import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HelpCenterPage from "@/components/pages/help";

export const metadata = {
  title: 'Help & Support | Weana',
  description: 'Answers to common questions and quick solutions.',
};

export default function HelpCenter() {
  return (
  <>
  <Navbar />
  <HelpCenterPage />
  <Footer />
  </>
  );
}