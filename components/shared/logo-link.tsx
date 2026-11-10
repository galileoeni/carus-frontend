"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import cookie from "@/services/cookie";

// Where the Carus logo should take you: your dashboard when logged in,
// otherwise the homepage.
export function homeHref() {
  const role = cookie.get("auth-user")?.role;
  if (role === "business") return "/business/dashboard";
  if (role) return "/dashboard";
  return "/";
}

export default function LogoLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  // Read the cookie after mount so server and client render the same HTML
  const [href, setHref] = useState("/");
  useEffect(() => setHref(homeHref()), []);

  return (
    <Link href={href} className={className} aria-label="Carus home">
      {children}
    </Link>
  );
}
