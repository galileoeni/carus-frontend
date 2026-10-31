"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CalendarPlus, Repeat, StickyNote } from "lucide-react";

import { LoadingComponent } from "@/components/loading";
import {
  daysFrom,
  describeFrequency,
  formatDay,
  formatKg,
  WINDOW_LABELS,
} from "@/lib/business";
import { useBusinessSchedule, useCancelPickup } from "@/queries/business";
import type { BusinessPickup } from "@/types/business";
import { DateTile, StatusBadge } from "./pickup-bits";
import QuickScheduleDialog from "./quick-schedule-dialog";

const relative = (today: string, date: string) => {
  const n = daysFrom(today, date);
  return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `In ${n} days`;
};

function PickupRow({
  pickup,
  today,
  onCancel,
  cancelling,
}: {
  pickup: BusinessPickup;
  today: string;
  onCancel?: (id: string) => void;
  cancelling?: boolean;
}) {
  const past = pickup.date < today;
  const canCancel =
    onCancel &&
    pickup.date > today &&
    (pickup.status === "requested" || pickup.status === "scheduled");

  return (
    <li className="flex items-center gap-4 py-4">
      <DateTile
        date={pickup.date}
        muted={past || ["cancelled", "declined"].includes(pickup.status)}
      />
      <div className="flex-1 min-w-0">
        <p className="font-bold">
          {WINDOW_LABELS[pickup.window].long}
          <span className="ml-2 text-xs font-bold text-grey-30 uppercase">
            {pickup.kind === "quick" ? "Quick" : "Regular"}
          </span>
        </p>
        {!past && (
          <p className="text-sm text-grey-40">{relative(today, pickup.date)}</p>
        )}
        {pickup.status === "completed" && pickup.totalWeightKg != null && (
          <p className="text-sm font-bold text-primary-60">
            {formatKg(pickup.totalWeightKg)} collected
          </p>
        )}
        {pickup.adminNote && (
          <p className="mt-1 text-sm text-grey-50 flex gap-1.5">
            <StickyNote className="size-4 shrink-0 mt-0.5 text-grey-30" />
            {pickup.adminNote}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <StatusBadge status={pickup.status} />
        {canCancel && (
          <button
            disabled={cancelling}
            onClick={() => onCancel(pickup.id)}
            className="cursor-pointer text-xs font-bold text-grey-40 hover:text-red-600 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </li>
  );
}

export default function BusinessSchedule() {
  const { data, isLoading, error } = useBusinessSchedule();
  const cancel = useCancelPickup();
  const [quickOpen, setQuickOpen] = useState(false);

  const schedule = data?.data;
  const takenDates = useMemo(
    () =>
      new Set(
        (schedule?.upcoming ?? [])
          .filter((p) => p.status === "requested" || p.status === "scheduled")
          .map((p) => p.date),
      ),
    [schedule],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingComponent description="Loading your schedule..." />
      </div>
    );
  }
  if (error || !schedule) {
    return (
      <p className="text-red-500 py-20 text-center">
        We couldn&apos;t load your schedule. Please refresh the page.
      </p>
    );
  }

  const { today, plan, upcoming, past } = schedule;
  const next = upcoming.find(
    (p) => p.status === "scheduled" || p.status === "requested",
  );

  const confirmCancel = (id: string) => {
    if (window.confirm("Cancel this pickup?")) cancel.mutate(id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Schedule</h1>
          <p className="text-grey-40 mt-1">
            Your regular collections and any extra pickups.
          </p>
        </div>
        <button
          onClick={() => setQuickOpen(true)}
          className="cursor-pointer inline-flex items-center gap-2 h-12 px-5 rounded-[12px] bg-primary-60 hover:bg-primary-50 text-white font-bold"
        >
          <CalendarPlus className="size-5" />
          Quick schedule
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
        {/* Next pickup */}
        <section className="relative isolate overflow-hidden rounded-[22px] bg-primary-100 text-white p-6 md:p-8">
          <div
            className="absolute -top-1/2 -right-1/4 w-[80%] aspect-square rounded-full bg-primary-60/40 blur-[100px] -z-10"
            style={{ animation: "impact-glow 14s ease-in-out infinite" }}
          />
          <p className="text-xs font-bold tracking-widest uppercase text-primary-20">
            Next pickup
          </p>
          {next ? (
            <>
              <p className="mt-3 text-3xl md:text-4xl font-black">
                {formatDay(next.date, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <p className="mt-2 text-white/75">
                {WINDOW_LABELS[next.window].long} · {relative(today, next.date)}
              </p>
              {next.status === "requested" && (
                <p className="mt-4 inline-block rounded-full bg-amber-300/20 text-amber-200 px-3 py-1 text-xs font-bold">
                  Waiting for Carus to confirm
                </p>
              )}
            </>
          ) : (
            <>
              <p className="mt-3 text-2xl md:text-3xl font-black">
                Nothing booked yet
              </p>
              <p className="mt-2 text-white/75">
                {plan
                  ? "Your next collection will appear here."
                  : "Carus will be in touch to agree a regular pickup day. Need one sooner? Use Quick schedule."}
              </p>
            </>
          )}
        </section>

        {/* Plan */}
        <section className="rounded-[22px] bg-white border border-primary-10 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="size-10 rounded-xl bg-primary-10 text-primary-60 flex items-center justify-center">
              <Repeat className="size-5" />
            </span>
            <p className="font-black text-lg">Your plan</p>
          </div>
          {plan ? (
            <>
              <p className="mt-4 text-xl font-black text-primary-80">
                {describeFrequency(plan)}
              </p>
              {plan.frequency !== "flexible" && (
                <p className="text-grey-50">
                  {WINDOW_LABELS[plan.window].long}
                </p>
              )}
              {plan.notes && (
                <p className="mt-4 text-sm text-grey-50 flex gap-1.5">
                  <StickyNote className="size-4 shrink-0 mt-0.5 text-grey-30" />
                  {plan.notes}
                </p>
              )}
              <p className="mt-4 text-xs text-grey-30">
                Want to change it? Contact the Carus team.
              </p>
            </>
          ) : (
            <p className="mt-4 text-grey-50">
              Not set up yet. Once you&apos;ve agreed a collection day with
              Carus, it shows here and pickups are added automatically.
            </p>
          )}
        </section>
      </div>

      {/* Upcoming */}
      <section className="rounded-[22px] bg-white border border-primary-10 p-6 md:p-8">
        <h2 className="font-black text-lg">Upcoming</h2>
        {upcoming.length ? (
          <ul className="mt-2 divide-y divide-grey-10/70">
            {upcoming.map((p) => (
              <PickupRow
                key={p.id}
                pickup={p}
                today={today}
                onCancel={confirmCancel}
                cancelling={cancel.isPending}
              />
            ))}
          </ul>
        ) : (
          <div className="mt-6 flex flex-col items-center text-center py-6 text-grey-40">
            <CalendarClock className="size-10 text-grey-20" />
            <p className="mt-3">No upcoming pickups.</p>
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="rounded-[22px] bg-white border border-primary-10 p-6 md:p-8">
          <h2 className="font-black text-lg">Past pickups</h2>
          <ul className="mt-2 divide-y divide-grey-10/70">
            {past.map((p) => (
              <PickupRow key={p.id} pickup={p} today={today} />
            ))}
          </ul>
        </section>
      )}

      {quickOpen && (
        <QuickScheduleDialog
          today={today}
          takenDates={takenDates}
          onClose={() => setQuickOpen(false)}
        />
      )}
    </div>
  );
}
