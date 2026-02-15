/* eslint-disable @typescript-eslint/no-explicit-any */

import { GeneralResponse } from ".";

export interface ScheduleState {
  errors: any[];
  isLoading: boolean;
  isScheduled: boolean;
  schedulePickup: ScheduleResponse | null;
}

export interface Schedule {
  id: string;
  address: string;
  amount: string;
  category: string;
  container_amount: number;
  date: string;
  material: string;
  material_amount: number;
  schedule_date: string;
  status: string;
}

export interface ScheduleResponse extends GeneralResponse {
  data: Schedule[];
}
export interface PostScheduleResponse extends GeneralResponse {
  data: Schedule;
}

export interface SchedulePickupInput {
  material: string;
  material_amount: number;
  container_amount: number;
  address: string;
  date: string;
  category: "pickup" | "dropoff";
}
export interface DeleteSchedulePayload {
  id: string;
}
export interface UpdateSchedulePayload {
  id: string;
  status: string;
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

export interface GetSchedulesResponse extends GeneralResponse {
  data: Schedules[];
}
