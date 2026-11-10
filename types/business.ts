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
  // Branches see pickups and data, not payments
  isBranch: boolean;
  branchName: string | null;
  hq: { companyName: string } | null;
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

export interface BusinessData {
  summary: {
    totalKg: number;
    pickups: number;
    plasticKg: number;
    co2AvoidedKg: number;
    byMaterial: { material: string; kg: number }[];
    months: { month: string; kg: number; pickups: number }[]; // YYYY-MM
  };
  pickups: CollectedPickup[];
}

export interface BusinessDataResponse extends GeneralResponse {
  data: BusinessData;
}

/* ---------- Locations (HQ and branches) ---------- */

export interface BusinessLocation {
  id: string; // the location's account id
  name: string; // "Head office" or the branch name
  address: string;
  city: string;
  totalKg: number;
  pickups: number;
  lastPickup: string | null;
  nextPickup: string | null;
  plan: SchedulePlan | null;
}

export interface BranchLocation extends BusinessLocation {
  contact: { name: string; email: string; phone: string };
  status: string;
  joinedAt: string;
}

export interface BranchInvite {
  id: string;
  token: string;
  branchName: string | null;
  expiresAt: string;
  createdAt: string;
}

export interface BranchesResponse extends GeneralResponse {
  data: {
    hq: BusinessLocation;
    branches: BranchLocation[];
    invites: BranchInvite[];
  };
}

export interface BranchDetailResponse extends GeneralResponse {
  data: BusinessData & {
    branch: {
      id: string;
      name: string;
      address: string;
      city: string;
      contact: { name: string; email: string; phone: string };
      joinedAt: string;
    };
    plan: SchedulePlan | null;
    upcoming: BusinessPickup[];
  };
}

export interface BranchInviteInfoResponse extends GeneralResponse {
  data: {
    companyName: string;
    industry: IndustryValue;
    wasteTypes: MaterialValue[];
    branchName: string | null;
    expiresAt: string;
  };
}

export type JoinBranchInput = Omit<
  BusinessRegisterInput,
  "companyName" | "industry" | "cacNumber" | "wasteTypes"
> & { branchName: string; wasteTypes?: string[] };
