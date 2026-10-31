import type { Metadata } from "next";
import type { ReactNode } from "react";

import BusinessPortalShell from "@/components/business/portal-shell";

export const metadata: Metadata = {
  title: { default: "Business", template: "%s | Carus Business" },
  robots: { index: false },
};

export default function BusinessPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <BusinessPortalShell>{children}</BusinessPortalShell>;
}
