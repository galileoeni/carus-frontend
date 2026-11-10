"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  Copy,
  Link2,
  Loader2,
  MapPin,
  MessageCircle,
  Recycle,
  Truck,
  X,
} from "lucide-react";

import { LoadingComponent } from "@/components/loading";
import { describeFrequency, formatDay, formatKg } from "@/lib/business";
import {
  useBranches,
  useCreateBranchInvite,
  useRevokeBranchInvite,
} from "@/queries/business";
import type { BranchInvite, BusinessLocation } from "@/types/business";
import { useBusinessAccount } from "../portal-shell";

const joinUrl = (token: string) =>
  `${window.location.origin}/business/join/${token}`;

const shortDate = (date: string) =>
  formatDay(date, { weekday: "short", day: "numeric", month: "short" });

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-primary-60 hover:bg-primary-50 text-white text-sm font-bold px-3 h-9"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}

function InviteRow({
  invite,
  companyName,
}: {
  invite: BranchInvite;
  companyName: string;
}) {
  const revoke = useRevokeBranchInvite();
  const url = joinUrl(invite.token);
  const message = `Hi! Use this link to set up ${
    invite.branchName ? `the ${invite.branchName} ` : "your branch "
  }account for ${companyName} on Carus: ${url}`;

  return (
    <li className="rounded-2xl border border-primary-10 bg-primary-10/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold">{invite.branchName || "New location"}</p>
        <p className="text-xs text-grey-40">
          Works once · expires {shortDate(invite.expiresAt.slice(0, 10))}
        </p>
      </div>
      <p className="mt-2 text-sm text-grey-50 break-all font-mono bg-white rounded-lg px-3 py-2 border border-primary-10">
        {url}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <CopyButton text={url} />
        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-primary-10 text-sm font-bold px-3 h-9 hover:bg-primary-10/50"
        >
          <MessageCircle className="size-4" /> Share on WhatsApp
        </a>
        <button
          type="button"
          disabled={revoke.isPending}
          onClick={() => revoke.mutate(invite.id)}
          className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg text-sm font-bold px-3 h-9 text-grey-50 hover:text-red-600 disabled:opacity-50"
        >
          <X className="size-4" /> Cancel link
        </button>
      </div>
    </li>
  );
}

function LocationCard({
  location,
  href,
  badge,
  extra,
}: {
  location: BusinessLocation;
  href: string;
  badge: string;
  extra?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[22px] bg-white border border-primary-10 p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-60/10 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-60 bg-primary-10 rounded-full px-2 py-0.5">
            {badge}
          </span>
          <p className="mt-2 font-black text-lg truncate">{location.name}</p>
          <p className="text-sm text-grey-40 flex items-start gap-1.5">
            <MapPin className="size-4 shrink-0 mt-0.5" />
            <span>
              {location.address}, {location.city}
            </span>
          </p>
          {extra && <p className="mt-1 text-xs text-grey-40">{extra}</p>}
        </div>
        <ChevronRight className="size-5 text-grey-30 group-hover:text-primary-60 shrink-0 mt-1" />
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-grey-40">Recycled</dt>
          <dd className="font-black text-primary-80">
            {formatKg(location.totalKg, { tonnes: true })}
          </dd>
        </div>
        <div>
          <dt className="text-grey-40">Pickups</dt>
          <dd className="font-black text-primary-80">{location.pickups}</dd>
        </div>
        <div>
          <dt className="text-grey-40">Next pickup</dt>
          <dd className="font-black text-primary-80">
            {location.nextPickup ? shortDate(location.nextPickup) : "None"}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-grey-40 flex items-center gap-1.5">
        <CalendarClock className="size-3.5" />
        {location.plan
          ? describeFrequency(location.plan)
          : "No regular schedule yet"}
      </p>
    </Link>
  );
}

export default function BusinessLocations() {
  const account = useBusinessAccount();
  const { data, isLoading, error } = useBranches();
  const create = useCreateBranchInvite();
  const [branchName, setBranchName] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingComponent description="Loading your locations..." />
      </div>
    );
  }
  if (error || !data) {
    return (
      <p className="text-red-500 py-20 text-center">
        We couldn&apos;t load your locations. Please refresh the page.
      </p>
    );
  }

  const { hq, branches, invites } = data.data;
  const companyName = account.business?.companyName ?? "your company";
  const all = [hq, ...branches];
  const tiles = [
    { label: "Locations", value: String(all.length), icon: Building2 },
    {
      label: "Recycled across all locations",
      value: formatKg(
        all.reduce((sum, l) => sum + l.totalKg, 0),
        { tonnes: true },
      ),
      icon: Recycle,
    },
    {
      label: "Pickups collected",
      value: String(all.reduce((sum, l) => sum + l.pickups, 0)),
      icon: Truck,
    },
  ];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate(
      { branchName: branchName.trim() || undefined },
      { onSuccess: () => setBranchName("") },
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Locations</h1>
        <p className="text-grey-40 mt-1">
          Your head office and branches. Each location has its own pickups and
          data; payments come to the head office.
        </p>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map(({ label, value, icon: Icon }) => (
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

      <section className="rounded-[22px] bg-primary-100 text-white p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="size-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Link2 className="size-5" />
          </span>
          <div>
            <h2 className="font-black text-lg">Add a location</h2>
            <p className="text-sm text-white/70">
              Create a private sign-up link and send it to the branch manager.
              They join straight away, no approval needed.
            </p>
          </div>
        </div>
        <form
          onSubmit={submit}
          className="mt-5 flex flex-col sm:flex-row gap-3"
        >
          <input
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            maxLength={80}
            placeholder="Branch name (optional), e.g. Ikeja branch"
            aria-label="Branch name"
            className="flex-1 h-12 rounded-[10px] bg-white text-grey-90 px-4 text-sm outline-none focus:ring-2 focus:ring-primary-20"
          />
          <button
            type="submit"
            disabled={create.isPending}
            className="cursor-pointer h-12 px-6 rounded-[10px] bg-white text-primary-80 font-bold flex items-center justify-center gap-2 hover:bg-primary-10 disabled:opacity-60"
          >
            {create.isPending && <Loader2 className="size-4 animate-spin" />}
            Create sign-up link
          </button>
        </form>
      </section>

      {invites.length > 0 && (
        <section>
          <h2 className="font-black text-lg">Links waiting to be used</h2>
          <ul className="mt-4 space-y-3">
            {invites.map((invite) => (
              <InviteRow
                key={invite.id}
                invite={invite}
                companyName={companyName}
              />
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-black text-lg">All locations</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <LocationCard
            location={hq}
            href="/business/data"
            badge="Head office"
          />
          {branches.map((b) => (
            <LocationCard
              key={b.id}
              location={b}
              href={`/business/locations/${b.id}`}
              badge="Branch"
              extra={`${b.contact.name} · ${b.contact.email}`}
            />
          ))}
        </div>
        {branches.length === 0 && (
          <p className="mt-4 text-sm text-grey-40">
            No branches yet. Create a link above to add your first one.
          </p>
        )}
      </section>
    </div>
  );
}
