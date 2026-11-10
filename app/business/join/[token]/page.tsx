import type { Metadata } from "next";
import Link from "next/link";

import BusinessAuthShell from "@/components/business/auth-shell";
import JoinBranchForm from "@/components/business/join-branch-form";

export const metadata: Metadata = {
  title: "Join your team on Carus",
  // Private link: keep it out of search results
  robots: { index: false, follow: false },
};

export default async function JoinBranchPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <BusinessAuthShell
      title="Set up your branch"
      subtitle="Your head office invited this location to Carus for Business."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/business/login" className="text-primary-60 font-bold">
            Log in
          </Link>
        </>
      }
    >
      <JoinBranchForm token={token} />
    </BusinessAuthShell>
  );
}
