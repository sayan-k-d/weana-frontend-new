"use client";

import AuthCard from "../shared/AuthCard";
import LoginForm from "./sections/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Login to your account"
      subtitle="Enter your registered email address and password to login"
    >
      <LoginForm />
    </AuthCard>
  );
}
