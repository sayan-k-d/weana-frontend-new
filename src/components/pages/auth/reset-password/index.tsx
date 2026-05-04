"use client";

import AuthCard from "../shared/AuthCard";
import ResetPasswordForm from "./sections/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      subtitle="Use a minimum of 6 characters with a mix of letters, numbers, and special symbols to ensure better protection."
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
