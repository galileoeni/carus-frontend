"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  CalendarClock,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Wallet,
  X,
} from "lucide-react";

import { LoadingComponent } from "@/components/loading";
import { useBusinessMe } from "@/queries/business";
import cookie from "@/services/cookie";
import type { BusinessAccount } from "@/types/business";

const BusinessAccountContext = createContext<BusinessAccount | null>(null);

// The logged-in business, for pages inside the portal layout
export function useBusinessAccount() {
  const account = useContext(BusinessAccountContext);
  if (!account) throw new Error("useBusinessAccount outside the portal");
  return account;
}

export const PORTAL_NAV = [
  { href: "/business/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/business/schedule", label: "Schedule", icon: CalendarClock },
  { href: "/business/data", label: "Pickup data", icon: BarChart3 },
  { href: "/business/payments", label: "Payments", icon: Wallet },
  { href: "/business/reports", label: "Reports", icon: FileText },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {PORTAL_NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
              active
                ? "bg-white text-primary-80 shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Sidebar({
  account,
  onLogout,
  onNavigate,
}: {
  account: BusinessAccount;
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="h-full flex flex-col bg-primary-100 text-white p-5">
      <Link href="/business/dashboard" className="flex items-center gap-2 px-2">
        <Image
          src="/logo.png"
          alt="Carus Logo"
          width={117}
          height={32}
          className="w-[100px] h-auto brightness-0 invert"
        />
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-20 border border-primary-20/40 rounded-full px-2 py-0.5">
          Business
        </span>
      </Link>

      <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-4">
        <p className="text-xs text-white/50">Signed in as</p>
        <p className="mt-1 font-bold leading-tight truncate">
          {account.business?.companyName ?? "Your business"}
        </p>
        <p className="text-xs text-white/60 truncate">{account.email}</p>
      </div>

      <div className="mt-6 flex-1">
        <NavLinks onNavigate={onNavigate} />
      </div>

      <button
        onClick={onLogout}
        className="cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/10 hover:text-white"
      >
        <LogOut className="size-5" />
        Log out
      </button>
    </div>
  );
}

export default function BusinessPortalShell({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data, isLoading, error } = useBusinessMe();

  const logout = () => {
    cookie.delete("auth-user");
    queryClient.clear();
    router.push("/business/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <LoadingComponent description="Loading your business..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-svh flex items-center justify-center px-5">
        <div className="max-w-sm text-center">
          <h1 className="text-2xl font-black">Business account required</h1>
          <p className="mt-2 text-grey-50">
            You&apos;re signed in with an account that isn&apos;t a business
            account, or your session has ended.
          </p>
          <button
            onClick={logout}
            className="cursor-pointer mt-6 px-6 py-3 rounded-[10px] bg-primary-60 text-white font-bold"
          >
            Log in as a business
          </button>
        </div>
      </div>
    );
  }

  const account = data.data;

  return (
    <div className="min-h-svh bg-[#f4f8f5] lg:pl-72">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72">
        <Sidebar account={account} onLogout={logout} />
      </aside>

      {/* Mobile top bar + drawer */}
      <header className="lg:hidden sticky top-0 z-40 bg-primary-100 text-white px-5 h-16 flex items-center justify-between">
        <p className="font-bold truncate">
          {account.business?.companyName ?? "Carus Business"}
        </p>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="cursor-pointer p-2 -mr-2"
        >
          <Menu className="size-6" />
        </button>
      </header>
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 max-w-[85vw] h-full relative">
            <Sidebar
              account={account}
              onLogout={logout}
              onNavigate={() => setMenuOpen(false)}
            />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="cursor-pointer absolute top-5 right-4 text-white/70"
            >
              <X className="size-6" />
            </button>
          </div>
          <button
            aria-label="Close menu"
            className="flex-1 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      <main className="px-5 md:px-8 lg:px-10 py-8 max-w-6xl">
        <BusinessAccountContext.Provider value={account}>
          {children}
        </BusinessAccountContext.Provider>
      </main>
    </div>
  );
}
