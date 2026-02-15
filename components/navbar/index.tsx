"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="hidden md:flex justify-between items-center px-10 mt-5 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-x-30 md:gap-x-20 lg:gap-x-30 xl:gap-x-40">
          <Link href="/" className="flex">
            <Image
              aria-hidden
              src="/logo.png"
              alt="Carus Logo"
              width={235}
              height={64}
              className="w-[117px] h-[32px]"
            />
          </Link>
        </div>
        {/* nav links */}
        <nav className="hidden md:flex items-center space-x-20 md:space-x-10 lg:space-x-20 xl:space-x-30">
          <Link href="/" className="text-primary-60 font-bold">
            Home
          </Link>
          <Link href="#services" className="text-grey-100">
            Services
          </Link>
          <Link href="#contact" className="text-grey-100">
            Contact
          </Link>
        </nav>

        {/* Right side: auth buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-primary-60 font-bold rounded-lg border border-primary-60"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile */}

      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white">
        <div className="flex justify-between items-center px-5 py-4">
          <Image
            src="/logo.png"
            alt="Carus Logo"
            width={117}
            height={32}
            className="w-[117px] h-[32px]"
          />

          <button
            onClick={() => setSidebarOpen(true)}
            className="px-2 text-[#292D32] text-2xl active:scale-90 hover:scale-100 scale-100"
          >
            <Menu />
          </button>
        </div>

        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`pb-8 md:hidden fixed top-0 w-full shadow-2xl bg-white z-50 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex justify-between items-center px-5 mt-5 w-full">
            <Image
              src="/logo.png"
              alt="Carus Logo"
              width={117}
              height={32}
              className="w-[117px] h-[32px]"
            />

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-[#FF6161] text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col space-y-12 mt-8 pl-15">
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className="text-primary-60 font-bold"
            >
              Home
            </Link>

            <Link
              href="#services"
              onClick={() => setSidebarOpen(false)}
              className="text-grey-100"
            >
              Services
            </Link>

            <Link
              href="#contact"
              onClick={() => setSidebarOpen(false)}
              className="text-grey-100"
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-5 pl-15 mt-12">
            <Link
              href="/login"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-2 text-center text-primary-60 font-bold rounded-lg border border-primary-60 w-[155px]"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-2 text-center bg-primary text-white rounded-lg w-[155px]"
            >
              Sign Up
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
