import { GeneralResponse } from "@/types";

export interface AdminFulfillScheduleInput {
  material: string;
  material_amount: number;
}

export interface Schedules {
  id: string;
  address: string;
  amount: string;
  category: string;
  container_amount: number;
  date: string;
  lga: string;
  material: string;
  material_amount: number;
  schedule_date: string;
  status: string;
}

export type AdminAcceptScheduleResponse = GeneralResponse & {
  data: Record<string, never>;
};
export type AdminCancelScheduleResponse = GeneralResponse & {
  data: Record<string, never>;
};
export type AdminFulfillScheduleResponse = GeneralResponse & {
  data: Record<string, never>;
};

export type AdminGetAllSchedulesResponse = GeneralResponse & {
  data: Schedules[];
};
