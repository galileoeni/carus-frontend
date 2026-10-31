import type { Metadata } from "next";
import Link from "next/link";

import BusinessAuthShell from "@/components/business/auth-shell";
import BusinessLoginForm from "@/components/business/login-form";

export const metadata: Metadata = {
  title: "Business Login",
  description:
    "Log in to Carus for Business to manage pickups, payments and recycling reports.",
};

export default function BusinessLoginPage() {
  return (
    <BusinessAuthShell
      title="Welcome back"
      subtitle="Log in to manage your pickups, payments and reports."
      footer={
        <>
          New to Carus for Business?{" "}
          <Link href="/business/register" className="text-primary-60 font-bold">
            Create a business account
          </Link>
        </>
      }
    >
      <BusinessLoginForm />
    </BusinessAuthShell>
  );
}
