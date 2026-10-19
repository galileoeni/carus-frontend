"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDown,
  BusFront,
  Car,
  CloudOff,
  Leaf,
  Recycle,
  TreePine,
} from "lucide-react";

import { LEGAL_CONTACT_EMAIL } from "@/components/legal";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import {
  BOTTLE_KG,
  CAR_CO2_KG_PER_KM,
  CO2_KG_PER_KG_PLASTIC,
  computeImpact,
  DANFO_KG,
  type Impact,
  TREE_CO2_KG_PER_YEAR,
} from "@/lib/impact";
import { useImpact } from "@/queries/impact";

const fmt = (n: number, digits = 0) =>
  n.toLocaleString("en-NG", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

// Short form for big numbers: 4.2M, 300k
const compact = (n: number) =>
  n >= 1_000_000
    ? `${fmt(n / 1_000_000, 1)}M`
    : n >= 10_000
      ? `${fmt(n / 1000, 0)}k`
      : fmt(n);

/* ---------- Hero ---------- */

// Fixed positions so server and client render the same thing
const FLOATERS = [
  { left: 4, size: 28, delay: 0, duration: 16, spin: 50 },
  { left: 13, size: 20, delay: 5, duration: 19, spin: -30 },
  { left: 22, size: 34, delay: 9, duration: 17, spin: 70 },
  { left: 31, size: 22, delay: 2, duration: 21, spin: -60 },
  { left: 42, size: 26, delay: 12, duration: 18, spin: 40 },
  { left: 55, size: 30, delay: 6, duration: 20, spin: -45 },
  { left: 64, size: 20, delay: 1, duration: 15, spin: 80 },
  { left: 72, size: 36, delay: 10, duration: 22, spin: -35 },
  { left: 81, size: 24, delay: 4, duration: 17, spin: 55 },
  { left: 90, size: 28, delay: 8, duration: 19, spin: -70 },
  { left: 96, size: 18, delay: 13, duration: 16, spin: 30 },
  { left: 48, size: 18, delay: 15, duration: 23, spin: -50 },
];

function Bottle({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 2} viewBox="0 0 24 48" aria-hidden>
      <path
        d="M9 1h6v5c0 1.5 1 2.5 2 3.6 1.4 1.5 2 3.4 2 5.4V44a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V15c0-2 .6-3.9 2-5.4 1-1.1 2-2.1 2-3.6V1Z"
        fill="currentColor"
      />
      <rect x="8" y="0" width="8" height="3" rx="1" fill="currentColor" />
    </svg>
  );
}

function FloatingBottles() {
  return (
    <div className="impact-float absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="absolute bottom-[-12%]"
          style={
            {
              left: `${f.left}%`,
              animation: `impact-rise ${f.duration}s linear ${f.delay}s infinite both`,
              "--impact-spin": `${f.spin}deg`,
            } as CSSProperties
          }
        >
          <div
            className="text-white/25"
            style={{
              animation: `impact-fade-out ${f.duration}s linear ${f.delay}s infinite both`,
            }}
          >
            <Bottle size={f.size} />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center text-primary-30"
            style={{
              animation: `impact-fade-in ${f.duration}s linear ${f.delay}s infinite both`,
            }}
          >
            <Leaf style={{ width: f.size * 1.2, height: f.size * 1.2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Hero({ impact }: { impact: Impact }) {
  const kg = useCountUp(impact.plasticKg, true, 2600);
  const co2 = useCountUp(impact.co2Tonnes, true, 2600);

  return (
    <section className="impact-motion relative isolate overflow-hidden bg-primary-110 text-white min-h-[92svh] flex items-center">
      {/* Glows */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[max(70vw,520px)] h-[max(70vw,520px)] rounded-full bg-primary-60/40 blur-[120px] -z-10"
        style={{ animation: "impact-glow 14s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[max(60vw,460px)] h-[max(60vw,460px)] rounded-full bg-[#7bd88f]/20 blur-[120px] -z-10"
        style={{ animation: "impact-glow 18s ease-in-out infinite reverse" }}
      />
      <FloatingBottles />

      <div className="relative max-w-screen-xl mx-auto px-5 md:px-10 py-28 text-center w-full">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-bold tracking-widest uppercase text-primary-20 backdrop-blur">
          <Recycle className="size-4" /> Our impact so far
        </p>

        <h1 className="mt-8 font-black leading-none tracking-tight">
          <span className="block text-[18vw] md:text-[150px] lg:text-[180px] tabular-nums bg-gradient-to-b from-white to-primary-20 bg-clip-text text-transparent">
            {fmt(kg)}
          </span>
          <span className="block mt-2 text-3xl md:text-5xl text-primary-20">
            kilograms of plastic
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-base md:text-xl text-white/75">
          collected and recycled across Nigeria. Kept out of our streets,
          drains, beaches and waterways, and turned back into something useful.
        </p>

        <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-5 py-4 backdrop-blur">
          <CloudOff className="size-7 text-primary-20 shrink-0" />
          <p className="text-left">
            <span className="block text-2xl md:text-3xl font-black tabular-nums">
              ≈ {fmt(co2)} tonnes
            </span>
            <span className="text-sm text-white/70">
              of CO₂ emissions avoided
            </span>
          </p>
        </div>
      </div>

      <a
        href="#numbers"
        aria-label="See the numbers"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-white"
        style={{ animation: "impact-bounce 2s ease-in-out infinite" }}
      >
        <ArrowDown className="size-6" />
      </a>
    </section>
  );
}

/* ---------- Stat cards ---------- */

function EarthOrbit({ laps, run }: { laps: number; run: boolean }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="size-20" aria-hidden>
      <circle cx="40" cy="40" r="18" className="fill-primary-60" />
      <path
        d="M30 33c4 1 6-2 9 0s1 6 5 6 6 4 3 7-6 1-8 4"
        className="stroke-primary-10 fill-none"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="40"
        cy="40"
        r={r}
        className="stroke-primary-10 fill-none"
        strokeWidth="2"
      />
      <circle
        cx="40"
        cy="40"
        r={r}
        className="stroke-[#f5b700] fill-none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${c * 0.85} ${c}`}
        strokeDashoffset={c * 0.85}
        transform="rotate(-90 40 40)"
        style={
          run
            ? {
                animation: `impact-orbit ${Math.min(1 + laps * 0.3, 4)}s ease-out forwards`,
              }
            : undefined
        }
      />
    </svg>
  );
}

function StatCard({
  icon,
  value,
  label,
  note,
  delay,
  run,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  note: string;
  delay: number;
  run: boolean;
}) {
  return (
    <div
      className="group rounded-[22px] bg-white border border-primary-10 p-6 md:p-7 shadow-[0_1px_0_rgba(2,105,55,0.05)] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-60/10 transition-all duration-300"
      style={
        run
          ? {
              animation: `impact-pop 0.7s ${delay}s cubic-bezier(.2,.9,.3,1.2) both`,
            }
          : { opacity: 0 }
      }
    >
      <div className="h-20 flex items-center">{icon}</div>
      <p className="mt-4 text-4xl md:text-5xl font-black text-primary-80 tabular-nums">
        {value}
      </p>
      <p className="mt-2 font-bold text-grey-90">{label}</p>
      <p className="mt-1 text-sm text-grey-40">{note}</p>
    </div>
  );
}

function IconChip({ children }: { children: ReactNode }) {
  return (
    <div className="size-16 rounded-2xl bg-primary-10 text-primary-60 flex items-center justify-center group-hover:bg-primary-60 group-hover:text-white transition-colors duration-300">
      {children}
    </div>
  );
}

function Numbers({ impact }: { impact: Impact }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const co2 = useCountUp(impact.co2Tonnes, inView);
  const bottles = useCountUp(impact.bottles, inView);
  const trees = useCountUp(impact.treeYears, inView);
  const laps = useCountUp(impact.earthLaps, inView);

  return (
    <section
      id="numbers"
      className="impact-motion bg-[#f4f8f5] py-20 md:py-28 scroll-mt-10"
    >
      <div className="max-w-screen-xl mx-auto px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-widest uppercase text-primary-60">
            What that means
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
            Every kilogram adds up to something you can picture.
          </h2>
        </div>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <StatCard
            run={inView}
            delay={0}
            icon={
              <IconChip>
                <CloudOff className="size-8" />
              </IconChip>
            }
            value={`${fmt(co2)} t`}
            label="CO₂ emissions avoided"
            note="by recycling instead of making new plastic"
          />
          <StatCard
            run={inView}
            delay={0.12}
            icon={
              <IconChip>
                <Recycle className="size-8" />
              </IconChip>
            }
            value={compact(bottles)}
            label="plastic bottles"
            note="the same weight in 50cl drinks bottles"
          />
          <StatCard
            run={inView}
            delay={0.24}
            icon={
              <IconChip>
                <TreePine className="size-8" />
              </IconChip>
            }
            value={fmt(trees)}
            label="trees growing for a year"
            note="to soak up the same amount of CO₂"
          />
          <StatCard
            run={inView}
            delay={0.36}
            icon={<EarthOrbit laps={impact.earthLaps} run={inView} />}
            value={`${fmt(laps, 1)}×`}
            label="around the Earth by car"
            note={`${compact(impact.carKm)} km of driving emissions avoided`}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Danfo wall ---------- */

function DanfoWall({ impact }: { impact: Impact }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const count = Math.round(impact.danfos);
  const shown = Math.min(count, 120);

  if (count < 1) return null;

  return (
    <section className="impact-motion bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
        <div>
          <p className="text-sm font-bold tracking-widest uppercase text-primary-60">
            How heavy is that?
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
            About{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">{fmt(count)} danfos</span>
              <span className="absolute inset-x-0 bottom-1 h-3 md:h-4 bg-[#f5b700]/60 -z-0" />
            </span>{" "}
            worth of plastic.
          </h2>
          <p className="mt-5 text-grey-50 text-lg">
            Picture them parked bumper to bumper on Third Mainland Bridge, every
            one full of plastic that Nigerians handed to Carus instead of the
            gutter.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-8 sm:grid-cols-10 gap-2 md:gap-3"
          role="img"
          aria-label={`${count} danfo buses`}
        >
          {Array.from({ length: shown }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg md:rounded-xl bg-[#f5b700] text-grey-100 flex items-center justify-center shadow-sm"
              style={
                inView
                  ? {
                      animation: `impact-pop 0.45s ${i * 0.035}s cubic-bezier(.2,.9,.3,1.3) both`,
                    }
                  : { opacity: 0 }
              }
            >
              <BusFront className="size-[60%]" strokeWidth={2.2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Milestone + CTA ---------- */

function Milestone({ impact }: { impact: Impact }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const pct = Math.round(impact.milestoneProgress * 100);

  return (
    <section className="impact-motion relative isolate overflow-hidden bg-primary-100 text-white py-20 md:py-28">
      <div
        className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-primary-60/30 blur-[120px] -z-10"
        style={{ animation: "impact-glow 16s ease-in-out infinite" }}
      />
      <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-primary-20">
          Next milestone
        </p>
        <h2 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
          Help us reach {fmt(impact.nextMilestoneKg)}&nbsp;kg
        </h2>

        <div ref={ref} className="mt-10 text-left">
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>{fmt(impact.plasticKg)} kg</span>
            <span>{pct}%</span>
          </div>
          <div className="h-4 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-40 via-[#7bd88f] to-[#f5b700] transition-[width] duration-[2000ms] ease-out"
              style={{ width: inView ? `${pct}%` : "0%" }}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/register"
            className="px-7 py-4 rounded-xl bg-white text-primary-80 font-bold hover:bg-primary-10 transition-colors"
          >
            Schedule a pickup
          </Link>
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=${encodeURIComponent("Partnering with Carus")}`}
            className="px-7 py-4 rounded-xl border border-white/30 font-bold hover:bg-white/10 transition-colors"
          >
            Partner with us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Methodology ---------- */

function Methodology() {
  const rows = [
    {
      icon: <CloudOff className="size-5" />,
      title: "CO₂ avoided",
      body: `Plastic recycled × ${CO2_KG_PER_KG_PLASTIC} kg CO₂e per kg. Recycling avoids the emissions from making new plastic; published estimates for common plastics (PET, HDPE) range roughly 1–3 kg, and we use the conservative end.`,
    },
    {
      icon: <Recycle className="size-5" />,
      title: "Plastic bottles",
      body: `Plastic recycled ÷ ${BOTTLE_KG * 1000} g, the weight of a typical 50cl PET drinks bottle.`,
    },
    {
      icon: <TreePine className="size-5" />,
      title: "Trees",
      body: `CO₂ avoided ÷ ${TREE_CO2_KG_PER_YEAR} kg, roughly what one mature tree absorbs in a year.`,
    },
    {
      icon: <Car className="size-5" />,
      title: "Driving",
      body: `CO₂ avoided ÷ ${CAR_CO2_KG_PER_KM * 1000} g per km for an average petrol car, compared with the 40,075 km distance around the Earth.`,
    },
    {
      icon: <BusFront className="size-5" />,
      title: "Danfos",
      body: `Plastic recycled ÷ ${fmt(DANFO_KG)} kg, the approximate unladen weight of a Lagos danfo.`,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-lg mx-auto px-5 md:px-10">
        <h2 className="text-2xl md:text-3xl font-black">How we calculate</h2>
        <p className="mt-2 text-grey-50">
          All figures are estimates based on the total weight of plastic Carus
          has collected for recycling. We keep them conservative.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-6">
          {rows.map((row) => (
            <div key={row.title} className="flex gap-4">
              <div className="size-10 shrink-0 rounded-xl bg-primary-10 text-primary-60 flex items-center justify-center">
                {row.icon}
              </div>
              <div>
                <p className="font-bold">{row.title}</p>
                <p className="text-sm text-grey-50 mt-1">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function ImpactPage() {
  const { data, isLoading, error } = useImpact();

  if (isLoading) {
    return <section className="bg-primary-110 min-h-[92svh]" />;
  }

  if (error || !data) {
    return (
      <section className="bg-primary-110 min-h-[60svh] flex items-center justify-center px-5 text-center text-white/80">
        We couldn&apos;t load our impact figures right now. Please try again
        shortly.
      </section>
    );
  }

  const impact = computeImpact(data.data.plasticKg);

  return (
    <>
      <Hero impact={impact} />
      <Numbers impact={impact} />
      <DanfoWall impact={impact} />
      <Milestone impact={impact} />
      <Methodology />
    </>
  );
}
