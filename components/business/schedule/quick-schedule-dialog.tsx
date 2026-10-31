"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  addDaysTo,
  formatDay,
  parseDay,
  QUICK_MAX_DAYS_AHEAD,
  WINDOW_LABELS,
} from "@/lib/business";
import { useQuickPickup } from "@/queries/business";
import type { PickupWindow } from "@/types/business";

export default function QuickScheduleDialog({
  today,
  takenDates,
  onClose,
}: {
  today: string;
  takenDates: Set<string>;
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [pickupWindow, setPickupWindow] = useState<PickupWindow>("morning");
  const [note, setNote] = useState("");
  const { mutate, isPending } = useQuickPickup();

  const min = addDaysTo(today, 1);
  const max = addDaysTo(today, QUICK_MAX_DAYS_AHEAD);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const dateError = !date
    ? ""
    : date < min || date > max
      ? `Choose a date between ${formatDay(min, { day: "numeric", month: "short" })} and ${formatDay(max, { day: "numeric", month: "short" })}`
      : parseDay(date).getUTCDay() === 0
        ? "We don't collect on Sundays"
        : takenDates.has(date)
          ? "You already have a pickup on this day"
          : "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || dateError) return;
    mutate(
      { date, window: pickupWindow, note: note.trim() || undefined },
      { onSuccess: onClose },
    );
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-schedule-title"
        className="bg-white w-full md:max-w-md rounded-t-[22px] md:rounded-[22px] p-6 max-h-[90svh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="quick-schedule-title" className="text-xl font-black">
              Quick schedule
            </h2>
            <p className="text-sm text-grey-40 mt-1">
              Book an extra pickup. The Carus team will confirm it.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer p-1 rounded-md hover:bg-grey-10"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <Label htmlFor="quick-date" className="mb-2 block font-bold">
              Date
            </Label>
            <input
              id="quick-date"
              type="date"
              min={min}
              max={max}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 rounded-md bg-[#F3F3F3] px-3 text-sm"
              required
            />
            <p
              className={`text-xs mt-1 ${dateError ? "text-red-500" : "text-grey-40"}`}
            >
              {dateError ||
                `Tomorrow up to ${QUICK_MAX_DAYS_AHEAD} days ahead, Monday to Saturday`}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 font-bold text-sm">Time</legend>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(WINDOW_LABELS) as PickupWindow[]).map((w) => (
                <label
                  key={w}
                  className={`cursor-pointer rounded-xl border-2 p-3 text-sm ${
                    pickupWindow === w
                      ? "border-primary-60 bg-primary-10/60"
                      : "border-grey-10"
                  }`}
                >
                  <input
                    type="radio"
                    name="window"
                    value={w}
                    checked={pickupWindow === w}
                    onChange={() => setPickupWindow(w)}
                    className="sr-only"
                  />
                  <span className="block font-bold">
                    {WINDOW_LABELS[w].short}
                  </span>
                  <span className="text-grey-40">
                    {WINDOW_LABELS[w].long.split(" · ")[1]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="quick-note" className="mb-2 block font-bold">
              Note for the team{" "}
              <span className="font-normal text-grey-30">(optional)</span>
            </Label>
            <textarea
              id="quick-note"
              rows={3}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Extra waste after our event; use the back gate"
              className="w-full rounded-md bg-[#F3F3F3] p-3 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!date || !!dateError || isPending}
            className="cursor-pointer w-full h-12 rounded-[10px] bg-primary-60 hover:bg-primary-50 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Request pickup
          </button>
        </form>
      </div>
    </div>
  );
}
