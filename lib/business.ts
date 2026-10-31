// Option lists for the business portal. Values must match the server
// (BusinessIndustryEnum, MaterialEnum, LAGOS_LGAS).

export const INDUSTRIES = [
  { value: "hospitality", label: "Hotel, restaurant or bar" },
  { value: "retail", label: "Supermarket or retail" },
  { value: "manufacturing", label: "Manufacturing or factory" },
  { value: "office", label: "Office or corporate" },
  { value: "estate", label: "Estate or residential" },
  { value: "education", label: "School or university" },
  { value: "healthcare", label: "Hospital or clinic" },
  { value: "events", label: "Events" },
  { value: "other", label: "Other" },
] as const;

export const MATERIALS = [
  { value: "plastic", label: "Plastic", icon: "/plastic.svg" },
  { value: "paper", label: "Paper & cardboard", icon: "/paper.svg" },
  { value: "metal", label: "Metal & cans", icon: "/metal.svg" },
  { value: "glass", label: "Glass", icon: "/glass.svg" },
  { value: "e-waste", label: "E-waste", icon: "/e-waste.png" },
  { value: "organic", label: "Organic", icon: "/organic.svg" },
  { value: "mixed-waste", label: "Mixed waste", icon: "/mixed-waste.svg" },
] as const;

export type IndustryValue = (typeof INDUSTRIES)[number]["value"];
export type MaterialValue = (typeof MATERIALS)[number]["value"];

export const industryLabel = (value: string) =>
  INDUSTRIES.find((i) => i.value === value)?.label ?? value;

export const materialLabel = (value: string) =>
  MATERIALS.find((m) => m.value === value)?.label ?? value;

// Drop in a looping clip here (e.g. "/videos/business-login.mp4" in /public)
// to play it behind the business login; otherwise an animated backdrop shows.
export const BUSINESS_AUTH_VIDEO: string | null = null;

export const WINDOW_LABELS = {
  morning: { short: "Morning", long: "Morning · 8am – 12pm" },
  afternoon: { short: "Afternoon", long: "Afternoon · 12pm – 4pm" },
} as const;

export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Matches the server: quick pickups from tomorrow up to 14 days ahead
export const QUICK_MAX_DAYS_AHEAD = 14;

const ordinal = (n: number) =>
  `${n}${[11, 12, 13].includes(n % 100) ? "th" : (({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th")}`;

export const describeFrequency = (plan: {
  frequency: string;
  dayOfWeek: number | null;
  dayOfMonth: number | null;
}) => {
  switch (plan.frequency) {
    case "weekly":
      return `Every ${WEEKDAYS[plan.dayOfWeek ?? 1]}`;
    case "biweekly":
      return `Every other ${WEEKDAYS[plan.dayOfWeek ?? 1]}`;
    case "monthly":
      return `The ${ordinal(plan.dayOfMonth ?? 1)} of every month`;
    default:
      return "Flexible: dates agreed with Carus";
  }
};

// "YYYY-MM-DD" helpers that don't shift with the viewer's timezone
export const parseDay = (date: string) => new Date(`${date}T12:00:00Z`);
export const formatDay = (date: string, options: Intl.DateTimeFormatOptions) =>
  parseDay(date).toLocaleDateString("en-GB", { timeZone: "UTC", ...options });
export const addDaysTo = (date: string, days: number) => {
  const d = parseDay(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
export const daysFrom = (from: string, to: string) =>
  Math.round((parseDay(to).getTime() - parseDay(from).getTime()) / 86_400_000);

// 1234.5 -> "1,234.5 kg"; 2500 -> "2.5 t" when large
export const formatKg = (kg: number, { tonnes = false } = {}) =>
  tonnes && kg >= 1000
    ? `${(kg / 1000).toLocaleString("en-NG", { maximumFractionDigits: 1 })} t`
    : `${kg.toLocaleString("en-NG", { maximumFractionDigits: 1 })} kg`;

export const materialIcon = (value: string) =>
  MATERIALS.find((m) => m.value === value)?.icon ?? "/mixed-waste.svg";

export const formatMonth = (month: string) =>
  formatDay(`${month}-15`, { month: "long", year: "numeric" });
