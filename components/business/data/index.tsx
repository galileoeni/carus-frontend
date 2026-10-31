"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CloudOff, Images, Recycle, Scale, Truck } from "lucide-react";

import { LoadingComponent } from "@/components/loading";
import {
  formatDay,
  formatKg,
  formatMonth,
  materialIcon,
  materialLabel,
  WINDOW_LABELS,
} from "@/lib/business";
import { useBusinessData } from "@/queries/business";
import type { CollectedPickup } from "@/types/business";
import PhotoViewer from "./photo-viewer";

function PickupCard({
  pickup,
  onOpenPhoto,
}: {
  pickup: CollectedPickup;
  onOpenPhoto: (photos: string[], index: number, caption: string) => void;
}) {
  const caption = formatDay(pickup.date, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return (
    <article className="rounded-[22px] bg-white border border-primary-10 p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-black text-lg">
            {formatDay(pickup.date, {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-sm text-grey-40">
            {WINDOW_LABELS[pickup.window].long}
            {pickup.kind === "quick" && " · Quick pickup"}
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-black text-primary-80">
          {formatKg(pickup.totalWeightKg ?? 0)}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {pickup.items.map((item) => (
          <li
            key={item.material}
            className="inline-flex items-center gap-2 rounded-full bg-primary-10/70 px-3 py-1.5 text-sm"
          >
            <Image
              src={materialIcon(item.material)}
              alt=""
              width={18}
              height={18}
            />
            <span className="font-bold">{materialLabel(item.material)}</span>
            <span className="text-grey-50">{formatKg(item.weightKg)}</span>
          </li>
        ))}
      </ul>

      {pickup.photos.length > 0 ? (
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 gap-2">
          {pickup.photos.map((url, i) => (
            <button
              key={url}
              onClick={() => onOpenPhoto(pickup.photos, i, caption)}
              aria-label={`View photo ${i + 1}`}
              className="cursor-pointer relative aspect-square overflow-hidden rounded-xl bg-grey-10/40 group"
            >
              <Image
                src={url}
                alt=""
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-grey-30 flex items-center gap-2">
          <Images className="size-4" /> No photos for this pickup
        </p>
      )}
    </article>
  );
}

export default function BusinessData() {
  const { data, isLoading, error } = useBusinessData();
  const [month, setMonth] = useState<string>("all");
  const [viewer, setViewer] = useState<{
    photos: string[];
    index: number;
    caption: string;
  } | null>(null);

  const result = data?.data;
  const pickups = useMemo(
    () =>
      (result?.pickups ?? []).filter(
        (p) => month === "all" || p.date.startsWith(month),
      ),
    [result, month],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingComponent description="Loading your pickup data..." />
      </div>
    );
  }
  if (error || !result) {
    return (
      <p className="text-red-500 py-20 text-center">
        We couldn&apos;t load your pickup data. Please refresh the page.
      </p>
    );
  }

  const { summary } = result;
  const thisMonth = summary.months[0];
  const maxMaterialKg = Math.max(1, ...summary.byMaterial.map((m) => m.kg));

  if (summary.pickups === 0) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Pickup data</h1>
        <div className="mt-6 rounded-[22px] bg-white border border-primary-10 p-10 md:p-14 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-primary-10 text-primary-60 flex items-center justify-center">
            <Scale className="size-8" />
          </div>
          <h2 className="mt-5 text-xl font-black">
            No collections recorded yet
          </h2>
          <p className="mt-2 max-w-md text-grey-50">
            After each pickup, the Carus team records what was collected: weight
            per material and photos. It all appears here.
          </p>
        </div>
      </div>
    );
  }

  const tiles = [
    {
      label: "Recycled in total",
      value: formatKg(summary.totalKg, { tonnes: true }),
      icon: Recycle,
    },
    {
      label: "Pickups collected",
      value: summary.pickups.toLocaleString(),
      icon: Truck,
    },
    {
      label: thisMonth ? formatMonth(thisMonth.month) : "This month",
      value: formatKg(thisMonth?.kg ?? 0, { tonnes: true }),
      icon: Scale,
    },
    {
      label: "CO₂ avoided (from plastic)",
      value: formatKg(summary.co2AvoidedKg, { tonnes: true }),
      icon: CloudOff,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">Pickup data</h1>
        <p className="text-grey-40 mt-1">
          Everything collected from your business, recorded by the Carus team.
        </p>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      <section className="rounded-[22px] bg-white border border-primary-10 p-6 md:p-8">
        <h2 className="font-black text-lg">By material</h2>
        <ul className="mt-5 space-y-4">
          {summary.byMaterial.map((m) => (
            <li key={m.material} className="flex items-center gap-3">
              <Image
                src={materialIcon(m.material)}
                alt=""
                width={28}
                height={28}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-bold">{materialLabel(m.material)}</span>
                  <span className="text-grey-50">
                    {formatKg(m.kg)} ·{" "}
                    {Math.round((m.kg / summary.totalKg) * 100)}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-primary-10/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-40 to-primary-60"
                    style={{ width: `${(m.kg / maxMaterialKg) * 100}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-black text-lg">Collections</h2>
          {summary.months.length > 1 && (
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label="Filter by month"
              className="h-10 rounded-lg bg-white border border-primary-10 px-3 text-sm font-bold"
            >
              <option value="all">All time</option>
              {summary.months.map((m) => (
                <option key={m.month} value={m.month}>
                  {formatMonth(m.month)} · {formatKg(m.kg)}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="mt-4 space-y-4">
          {pickups.map((p) => (
            <PickupCard
              key={p.id}
              pickup={p}
              onOpenPhoto={(photos, index, caption) =>
                setViewer({ photos, index, caption })
              }
            />
          ))}
        </div>
      </section>

      {viewer && (
        <PhotoViewer
          photos={viewer.photos}
          index={viewer.index}
          caption={viewer.caption}
          onChange={(index) => setViewer({ ...viewer, index })}
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  );
}
