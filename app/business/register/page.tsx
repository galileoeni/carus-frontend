import type { Metadata } from "next";
import Link from "next/link";

import BusinessAuthShell from "@/components/business/auth-shell";
import BusinessRegisterForm from "@/components/business/register-form";

export const metadata: Metadata = {
  title: "Create a Business Account",
  description:
    "Sign your business up for scheduled recycling pickups, payments per kg and monthly impact reports.",
};

export default function BusinessRegisterPage() {
  return (
    <BusinessAuthShell
      title="Recycle with Carus"
      subtitle="Set up your business account in about two minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/business/login" className="text-primary-60 font-bold">
            Log in
          </Link>
        </>
      }
    >
      <BusinessRegisterForm />
    </BusinessAuthShell>
  );
}
