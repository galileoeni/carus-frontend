"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarPlus,
  CheckCircle2,
  Circle,
  CloudOff,
  FileText,
  Recycle,
  Truck,
  Wallet,
} from "lucide-react";

import {
  formatDay,
  formatKg,
  industryLabel,
  MATERIALS,
  WINDOW_LABELS,
} from "@/lib/business";
import { useBusinessData, useBusinessSchedule } from "@/queries/business";
import { useBusinessAccount } from "./portal-shell";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default function BusinessOverview() {
  const account = useBusinessAccount();
  const business = account.business;
  const schedule = useBusinessSchedule().data?.data;
  const next = schedule?.upcoming.find(
    (p) => p.status === "scheduled" || p.status === "requested",
  );

  // Payouts arrive in a later stage
  const onboarding = [
    { label: "Create your business account", done: true },
    { label: "Agree a pickup schedule with Carus", done: !!schedule?.plan },
    {
      label: "First collection",
      done: !!schedule?.past.some((p) => p.status === "completed"),
    },
    { label: "First payout to your bank", done: false },
  ];
  const doneCount = onboarding.filter((s) => s.done).length;

  const summary = useBusinessData().data?.data.summary;
  // Earnings arrive with payments (stage 4)
  const stats = [
    {
      label: "Collected",
      value: formatKg(summary?.totalKg ?? 0, { tonnes: true }),
      icon: Recycle,
    },
    { label: "Earned", value: "₦0", icon: Wallet },
    {
      label: "CO₂ avoided",
      value: formatKg(summary?.co2AvoidedKg ?? 0, { tonnes: true }),
      icon: CloudOff,
    },
    { label: "Pickups", value: String(summary?.pickups ?? 0), icon: Truck },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-grey-40">
          {greeting()}, {account.first_name}
        </p>
        <h1 className="mt-1 text-2xl md:text-4xl font-black">
          {business?.companyName ?? "Your business"}
        </h1>
      </div>

      {/* Getting started */}
      <section className="relative isolate overflow-hidden rounded-[22px] bg-primary-100 text-white p-6 md:p-8">
        <div
          className="absolute -top-1/2 -right-1/4 w-[70%] aspect-square rounded-full bg-primary-60/40 blur-[100px] -z-10"
          style={{ animation: "impact-glow 14s ease-in-out infinite" }}
        />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-primary-20">
              Getting started · {doneCount}/{onboarding.length}
            </p>
            {next ? (
              <>
                <h2 className="mt-2 text-2xl md:text-3xl font-black">
                  Next pickup:{" "}
                  {formatDay(next.date, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h2>
                <p className="mt-2 text-white/70 max-w-xl">
                  {WINDOW_LABELS[next.window].long} at{" "}
                  {business?.address ?? "your address"}
                  {next.status === "requested" && " · awaiting confirmation"}
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-2xl md:text-3xl font-black">
                  We&apos;ll be in touch to plan your pickups
                </h2>
                <p className="mt-2 text-white/70 max-w-xl">
                  A Carus team member will contact {account.first_name} to agree
                  a regular collection day for{" "}
                  {business?.address ?? "your address"}.
                </p>
              </>
            )}
          </div>
          <div className="h-2 md:w-48 rounded-full bg-white/10 overflow-hidden shrink-0">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-40 to-[#7bd88f]"
              style={{ width: `${(doneCount / onboarding.length) * 100}%` }}
            />
          </div>
        </div>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {onboarding.map((s) => (
            <li
              key={s.label}
              className={`flex items-center gap-3 rounded-xl p-3 text-sm ${
                s.done ? "bg-white/15" : "bg-white/5 text-white/70"
              }`}
            >
              {s.done ? (
                <CheckCircle2 className="size-5 text-[#7bd88f] shrink-0" />
              ) : (
                <Circle className="size-5 text-white/40 shrink-0" />
              )}
              {s.label}
            </li>
          ))}
        </ol>
      </section>

      {/* Quick actions */}
      <section className="grid sm:grid-cols-3 gap-4">
        {[
          {
            href: "/business/schedule",
            icon: CalendarPlus,
            title: "Quick schedule",
            body: "Book an extra pickup",
          },
          {
            href: "/business/payments",
            icon: Wallet,
            title: "Payout account",
            body: "Where we send your money",
          },
          {
            href: "/business/reports",
            icon: FileText,
            title: "Request a report",
            body: "PDF of your recycling",
          },
        ].map(({ href, icon: Icon, title, body }) => (
          <Link
            key={title}
            href={href}
            className="group flex items-center gap-4 rounded-[18px] bg-white border border-primary-10 p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-60/10 transition-all"
          >
            <span className="size-12 rounded-2xl bg-primary-10 text-primary-60 flex items-center justify-center group-hover:bg-primary-60 group-hover:text-white transition-colors shrink-0">
              <Icon className="size-6" />
            </span>
            <span>
              <span className="block font-bold">{title}</span>
              <span className="block text-sm text-grey-40">{body}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-[18px] bg-white border border-primary-10 p-5"
          >
            <Icon className="size-5 text-primary-40" />
            <p className="mt-3 text-2xl md:text-3xl font-black text-primary-80">
              {value}
            </p>
            <p className="text-sm text-grey-40">{label}</p>
          </div>
        ))}
      </section>

      {/* Company details */}
      {business && (
        <section className="rounded-[22px] bg-white border border-primary-10 p-6 md:p-8">
          <h2 className="text-lg font-black">Business details</h2>
          <dl className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
            {[
              ["Industry", industryLabel(business.industry)],
              ["Pickup address", `${business.address}, ${business.city}`],
              [
                "Contact",
                `${account.first_name} ${account.last_name}${business.contactRole ? ` · ${business.contactRole}` : ""}`,
              ],
              ["Phone", `${account.country_code} ${account.phone}`],
              ["CAC number", business.cacNumber || "Not provided"],
              [
                "Expected volume",
                business.estimatedMonthlyKg
                  ? `About ${business.estimatedMonthlyKg.toLocaleString()} kg a month`
                  : "Not sure yet",
              ],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="text-grey-40">{term}</dt>
                <dd className="mt-0.5 font-bold">{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <p className="text-sm text-grey-40 mb-2">Waste types</p>
            <div className="flex flex-wrap gap-2">
              {MATERIALS.filter((m) =>
                business.wasteTypes.includes(m.value),
              ).map((m) => (
                <span
                  key={m.value}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-10/70 px-3 py-1.5 text-sm font-bold"
                >
                  <Image src={m.icon} alt="" width={18} height={18} />
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
