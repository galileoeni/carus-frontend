"use client";

import { CalendarTick, Home, Setting2, Wallet } from "iconsax-react";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { httpLogout } from "@/services/http";
import { useNotifications } from "@/queries/notifications";

export default function SideNav() {
  const pathname = usePathname();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { data: notificationsData, isLoading } = useNotifications();
  const unreadCount = notificationsData?.data?.unreadCount || 0;

  const navLinks = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/schedule", label: "Schedule", icon: CalendarTick },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Setting2 },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setSideBarOpen(!sideBarOpen)}
        className="fixed top-4 right-8 z-50 md:hidden mt-5 active:scale-90 hover:scale-100 scale-100"
      >
        <Menu />
      </button>

      {/* Overlay */}
      {sideBarOpen && (
        <div
          onClick={() => setSideBarOpen(false)}
          className="md:hidden fixed inset-0 opacity-50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`min-h-screen w-[215px] md:w-[266px] bg-[#F3F3F3] text-grey-40 
          z-50 fixed top-0 left-0 transform transition-transform duration-300 ease-in-out
          ${sideBarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col justify-between`}
      >
        <div>
          <div className="pt-8 md:pt-10 px-5 md:px-12">
            <Link href="/">
              <Image
                aria-hidden
                src="/logo.png"
                alt="Carus Logo"
                width={235}
                height={64}
                className="w-[88px] md:w-[117px] h-[24px] md:h-[32px]"
              />
            </Link>
          </div>

          <nav className="flex flex-col justify-center space-y-8 mt-8 md:mt-15 pl-4 pr-2 md:px-8">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}`);
              const isNotifications = href === "/notifications";

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSideBarOpen(false)}
                  className={`flex relative items-center gap-4 transition transform duration-200 px-3 pr-10 py-2 text-base md:text-xl rounded-[10px] 
                  ${
                    isActive
                      ? "bg-white text-primary-60 cursor-default"
                      : "text-grey-40 hover:bg-white hover:text-primary-40"
                  }`}
                >
                  {isActive ? (
                    <Icon size={24} color="#026937" variant="Outline" />
                  ) : (
                    <Icon size={24} color="#6D6D6D" />
                  )}{" "}
                  {label}
                  {isNotifications && unreadCount > 0 ? (
                    <span className="md:hidden absolute right-3 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={() => httpLogout("user")}
          className="flex items-center gap-3 text-base md:text-xl text-grey-40 active:text-red-500 active:scale-100 hover:scale-95 mt-10 px-5 md:px-15 pb-20 transition duration-200 cursor-pointer"
        >
          <Image src="/logout.png" alt="" width={24} height={24} />
          Logout
        </button>
      </aside>
    </>
  );
}
