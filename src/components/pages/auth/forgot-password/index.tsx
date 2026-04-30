"use client";

import AuthCard from "../shared/AuthCard";
import ForgotPasswordForm from "./sections/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot password?"
      subtitle="We all forget sometimes. Submit your email and we will send you instructions to reset your password."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
