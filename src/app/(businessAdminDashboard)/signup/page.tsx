// import Signup from '@/components/pages/signup';
import Signup from '@/components/pages/signup/signup';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
};

export default function RegisterPage() {
  return <Signup />;
}