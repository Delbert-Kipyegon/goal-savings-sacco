"use client";

import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // The API should set the cookie automatically
      // Just redirect after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      // You should handle this error in your UI
      // For example, by setting an error state and displaying it in LoginForm
      throw error; // Re-throw to handle in the form component
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm onSubmit={handleLogin} />
      </Suspense>
    </div>
  );
}
