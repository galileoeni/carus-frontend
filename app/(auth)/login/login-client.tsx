"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/services/useAuth";
import LoginForm from "@/components/login";
import Loading from "@/components/loading";

export default function LoginClient() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) return <Loading />;

  return (
    <div>
      <LoginForm />
    </div>
  );
}
