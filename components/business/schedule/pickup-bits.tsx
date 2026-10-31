import type { PickupStatus } from "@/types/business";
import { formatDay } from "@/lib/business";

const STATUS_STYLES: Record<
  PickupStatus,
  { label: string; className: string }
> = {
  requested: {
    label: "Awaiting approval",
    className: "bg-amber-100 text-amber-800",
  },
  scheduled: {
    label: "Confirmed",
    className: "bg-primary-10 text-primary-80",
  },
  completed: { label: "Collected", className: "bg-primary-60 text-white" },
  missed: { label: "Missed", className: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelled", className: "bg-grey-10 text-grey-50" },
  declined: { label: "Declined", className: "bg-red-100 text-red-700" },
};

export function StatusBadge({ status }: { status: PickupStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${s.className}`}
    >
      {s.label}
    </span>
  );
}

// Calendar-style date tile
export function DateTile({
  date,
  muted = false,
}: {
  date: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`w-14 shrink-0 rounded-xl text-center py-2 ${
        muted ? "bg-grey-10/60 text-grey-40" : "bg-primary-10 text-primary-80"
      }`}
    >
      <p className="text-[11px] font-bold uppercase">
        {formatDay(date, { weekday: "short" })}
      </p>
      <p className="text-xl font-black leading-none mt-0.5">
        {formatDay(date, { day: "numeric" })}
      </p>
      <p className="text-[11px] font-bold uppercase mt-0.5">
        {formatDay(date, { month: "short" })}
      </p>
    </div>
  );
}
