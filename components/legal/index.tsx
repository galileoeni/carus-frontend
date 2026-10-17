import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Footer from "@/components/footer";

export const LEGAL_CONTACT_EMAIL = "carusrecycling@gmail.com";
export const LEGAL_LAST_UPDATED = "17 October 2026";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
  otherPage: { href: string; label: string };
}

export function LegalPage({
  title,
  intro,
  sections,
  otherPage,
}: LegalPageProps) {
  return (
    <div>
      <header className="w-full px-7 md:px-10 mt-5 max-w-screen-xl mx-auto flex items-center justify-between">
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
        <Link href="/" className="text-primary-60 font-bold text-sm">
          ← Back to home
        </Link>
      </header>

      <main className="max-w-screen-lg mx-auto px-7 md:px-10 py-10 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-grey-100">
          {title}
        </h1>
        <p className="mt-3 text-sm text-grey-40">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <p className="mt-6 text-grey-90 leading-relaxed">{intro}</p>

        <nav
          aria-label={`${title} contents`}
          className="mt-10 rounded-[10px] border border-grey-10 p-5"
        >
          <p className="font-bold text-grey-60 mb-3">Contents</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-primary-60 columns-1 md:columns-2 gap-10">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-6">
              <h2 className="text-xl md:text-2xl font-bold text-grey-60">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-3 space-y-3 text-grey-90 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-primary-60 [&_a]:underline">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 pt-6 border-t border-grey-10 text-sm text-grey-40">
          See also our{" "}
          <Link
            href={otherPage.href}
            className="text-primary-60 underline font-medium"
          >
            {otherPage.label}
          </Link>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
}
