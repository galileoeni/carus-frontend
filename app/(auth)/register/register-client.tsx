"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/services/useAuth";
import SignupForm from "@/components/register";

export default function RegisterClient() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) return null;

  return (
    <div>
      <SignupForm />
    </div>
  );
}
