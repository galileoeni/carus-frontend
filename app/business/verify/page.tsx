import type { Metadata } from "next";
import { Suspense } from "react";

import BusinessAuthShell from "@/components/business/auth-shell";
import BusinessVerifyForm from "@/components/business/verify-form";

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false },
};

export default function BusinessVerifyPage() {
  return (
    <BusinessAuthShell
      title="Check your inbox"
      subtitle="Enter the code we emailed you to finish setting up."
    >
      <Suspense>
        <BusinessVerifyForm />
      </Suspense>
    </BusinessAuthShell>
  );
}
