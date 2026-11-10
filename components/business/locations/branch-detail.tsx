"use client";

import Link from "next/link";
import { ArrowLeft, CalendarClock, Mail, MapPin, Phone } from "lucide-react";

import { LoadingComponent } from "@/components/loading";
import { describeFrequency, formatDay, WINDOW_LABELS } from "@/lib/business";
import { useBranchDetail } from "@/queries/business";
import { BusinessDataView } from "../data";

const STATUS_LABEL: Record<string, string> = {
  requested: "Awaiting confirmation",
  scheduled: "Scheduled",
  completed: "Collected",
  missed: "Missed",
  declined: "Declined",
};

// HQ's view of one branch: contact, schedule and pickup data
export default function BranchDetail({ id }: { id: string }) {
  const { data, isLoading, error } = useBranchDetail(id);

  const back = (
    <Link
      href="/business/locations"
      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-60 hover:text-primary-80"
    >
      <ArrowLeft className="size-4" /> All locations
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingComponent description="Loading this location..." />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="space-y-6">
        {back}
        <p className="text-red-500 py-10 text-center">
          We couldn&apos;t find this location.
        </p>
      </div>
    );
  }

  const { branch, plan, upcoming, ...result } = data.data;

  return (
    <div className="space-y-8">
      {back}

      <section className="rounded-[22px] bg-white border border-primary-10 p-6 md:p-8 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-black text-lg">{branch.name}</h2>
          <p className="mt-2 text-sm text-grey-50 flex items-start gap-2">
            <MapPin className="size-4 shrink-0 mt-0.5" />
            {branch.address}, {branch.city}
          </p>
          <p className="mt-2 text-sm text-grey-50">{branch.contact.name}</p>
          <p className="mt-1 text-sm text-grey-50 flex items-center gap-2">
            <Mail className="size-4" /> {branch.contact.email}
          </p>
          <p className="mt-1 text-sm text-grey-50 flex items-center gap-2">
            <Phone className="size-4" /> {branch.contact.phone}
          </p>
        </div>
        <div>
          <p className="text-sm text-grey-40 flex items-center gap-2">
            <CalendarClock className="size-4" /> Regular pickup
          </p>
          <p className="mt-1 font-bold">
            {plan
              ? `${describeFrequency(plan)} · ${WINDOW_LABELS[plan.window].short}`
              : "Not set yet. The Carus team will agree one with the branch."}
          </p>
          <p className="mt-4 text-sm text-grey-40">Coming up</p>
          {upcoming.length ? (
            <ul className="mt-1 space-y-1 text-sm">
              {upcoming.slice(0, 4).map((p) => (
                <li key={p.id} className="flex justify-between gap-3">
                  <span className="font-bold">
                    {formatDay(p.date, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span className="text-grey-50">
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm font-bold">No pickups booked</p>
          )}
        </div>
      </section>

      <BusinessDataView
        result={result}
        title={`${branch.name}: pickup data`}
        subtitle="Everything collected from this location, recorded by the Carus team."
      />
    </div>
  );
}
