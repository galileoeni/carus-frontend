"use client";

import type { ReactNode } from "react";
import { Building2 } from "lucide-react";

import { useBusinessAccount } from "./portal-shell";

// Pages only the head office uses (payments, locations). A branch sees a
// short note instead.
export default function HqOnly({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { business } = useBusinessAccount();
  if (!business?.isBranch) return <>{children}</>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black">{title}</h1>
      <div className="mt-6 rounded-[22px] bg-white border border-primary-10 p-8 md:p-12 text-center flex flex-col items-center">
        <div className="size-16 rounded-2xl bg-primary-10 text-primary-60 flex items-center justify-center">
          <Building2 className="size-8" />
        </div>
        <p className="mt-5 max-w-md text-grey-50">
          This is managed by your head office
          {business.hq ? `, ${business.hq.companyName}` : ""}. You can still see
          your pickups, data and reports.
        </p>
      </div>
    </div>
  );
}
