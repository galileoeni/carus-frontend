import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BadgeCheck, CalendarClock, FileText, Wallet } from "lucide-react";

import { BUSINESS_AUTH_VIDEO, MATERIALS } from "@/lib/business";

const FLOATERS = [
  { left: 8, size: 44, delay: 0, duration: 18, spin: 40 },
  { left: 24, size: 30, delay: 6, duration: 22, spin: -30 },
  { left: 41, size: 52, delay: 11, duration: 20, spin: 60 },
  { left: 58, size: 34, delay: 3, duration: 24, spin: -50 },
  { left: 72, size: 46, delay: 9, duration: 19, spin: 35 },
  { left: 88, size: 32, delay: 14, duration: 21, spin: -40 },
];

const PERKS = [
  { icon: CalendarClock, text: "Fixed pickups on your schedule" },
  { icon: Wallet, text: "Get paid per kg, straight to your bank" },
  { icon: FileText, text: "Monthly PDF reports for your ESG records" },
];

function BrandPanel() {
  return (
    <div className="impact-motion relative isolate overflow-hidden bg-primary-110 text-white h-full flex flex-col justify-end p-10 xl:p-14">
      {BUSINESS_AUTH_VIDEO ? (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover -z-20"
            src={BUSINESS_AUTH_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-110 via-primary-110/70 to-primary-110/30 -z-10" />
        </>
      ) : (
        <>
          <div
            className="absolute -top-1/4 -left-1/4 w-[120%] aspect-square rounded-full bg-primary-60/40 blur-[120px] -z-10"
            style={{ animation: "impact-glow 14s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-1/3 -right-1/3 w-[90%] aspect-square rounded-full bg-[#7bd88f]/20 blur-[120px] -z-10"
            style={{
              animation: "impact-glow 18s ease-in-out infinite reverse",
            }}
          />
          <div className="impact-float absolute inset-0 -z-10 pointer-events-none">
            {FLOATERS.map((f, i) => (
              <div
                key={i}
                className="absolute bottom-[-10%] rounded-2xl bg-white/10 backdrop-blur-sm p-3"
                style={
                  {
                    left: `${f.left}%`,
                    animation: `impact-rise ${f.duration}s linear ${f.delay}s infinite both`,
                    "--impact-spin": `${f.spin}deg`,
                  } as CSSProperties
                }
              >
                <Image
                  src={MATERIALS[i % MATERIALS.length].icon}
                  alt=""
                  width={f.size}
                  height={f.size}
                  className="opacity-80 brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <p className="inline-flex self-start items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary-20 backdrop-blur">
        <BadgeCheck className="size-4" /> Carus for Business
      </p>
      <h2 className="mt-5 text-4xl xl:text-5xl font-black leading-tight">
        Your waste,
        <br />
        <span className="text-primary-20">handled and paid for.</span>
      </h2>
      <ul className="mt-8 space-y-4">
        {PERKS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-white/85">
            <span className="size-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Icon className="size-5 text-primary-20" />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BusinessAuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="min-h-svh flex">
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        <div className="px-5 md:px-10 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Carus Logo"
              width={117}
              height={32}
              className="w-[117px] h-[32px]"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-60 bg-primary-10 rounded-full px-2 py-0.5">
              Business
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 md:px-10 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-2xl md:text-[32px] font-black leading-tight">
              {title}
            </h1>
            <p className="mt-2 text-grey-40 mb-8">{subtitle}</p>
            {children}
            {footer && (
              <div className="mt-8 text-center text-sm text-grey-50">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 sticky top-0 h-svh">
        <BrandPanel />
      </div>
    </section>
  );
}
