import { GeneralResponse } from ".";
import type { IndustryValue, MaterialValue } from "@/lib/business";

export interface BusinessRegisterInput {
  companyName: string;
  industry: string; // an INDUSTRIES value
  cacNumber?: string;
  address: string;
  city: string;
  wasteTypes: string[]; // MATERIALS values
  estimatedMonthlyKg?: number | null;
  first_name: string;
  last_name: string;
  contactRole?: string;
  email: string;
  phone: string;
  country_code: string;
  password: string;
}

export interface BusinessProfile {
  companyName: string;
  industry: IndustryValue;
  cacNumber: string | null;
  address: string;
  city: string;
  contactRole: string | null;
  wasteTypes: MaterialValue[];
  estimatedMonthlyKg: number | null;
  createdAt: string;
}

export interface BusinessAccount {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country_code: string;
  avatar: string;
  status: string;
  role: "business";
  business: BusinessProfile | null;
}

// Stored in the "auth-user" cookie after login or verification
export interface BusinessSession {
  email: string;
  first_name?: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface BusinessSessionResponse extends GeneralResponse {
  data: BusinessSession;
}

export interface BusinessMeResponse extends GeneralResponse {
  data: BusinessAccount;
}

export type PlanFrequency = "weekly" | "biweekly" | "monthly" | "flexible";
export type PickupWindow = "morning" | "afternoon";
export type PickupStatus =
  | "requested"
  | "scheduled"
  | "completed"
  | "missed"
  | "cancelled"
  | "declined";

export interface SchedulePlan {
  frequency: PlanFrequency;
  dayOfWeek: number | null; // 1 = Monday ... 6 = Saturday
  dayOfMonth: number | null; // 1–28
  window: PickupWindow;
  startDate: string;
  notes: string | null;
  updatedAt: string;
}

export interface BusinessPickup {
  id: string;
  date: string; // YYYY-MM-DD
  window: PickupWindow;
  kind: "scheduled" | "quick";
  status: PickupStatus;
  requestNote: string | null;
  adminNote: string | null;
  totalWeightKg: number | null; // once collected
  createdAt: string;
}

export interface BusinessScheduleResponse extends GeneralResponse {
  data: {
    today: string;
    plan: SchedulePlan | null;
    upcoming: BusinessPickup[];
    past: BusinessPickup[];
  };
}

export interface QuickPickupInput {
  date: string;
  window: PickupWindow;
  note?: string;
}

export interface CollectedPickup {
  id: string;
  date: string;
  window: PickupWindow;
  kind: "scheduled" | "quick";
  status: PickupStatus;
  collectedAt: string | null;
  totalWeightKg: number | null;
  items: { material: string; weightKg: number }[];
  photos: string[];
  adminNote: string | null;
}

export interface BusinessDataResponse extends GeneralResponse {
  data: {
    summary: {
      totalKg: number;
      pickups: number;
      plasticKg: number;
      co2AvoidedKg: number;
      byMaterial: { material: string; kg: number }[];
      months: { month: string; kg: number; pickups: number }[]; // YYYY-MM
    };
    pickups: CollectedPickup[];
  };
}
