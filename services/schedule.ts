import http from "@/services/http";
import { GeneralResponse } from "@/types";
import {
  PostScheduleResponse,
  SchedulePickupInput,
  ScheduleResponse,
} from "@/types/schedule";

export async function getSchedule(): Promise<ScheduleResponse> {
  return (await http.get("/schedule")).data;
}

export async function getScheduleById(id?: string): Promise<ScheduleResponse> {
  return (await http.get(`/schedule/${id}`)).data;
}

export async function postSchedulePickup(
  formData: FormData,
): Promise<PostScheduleResponse> {
  return await http.post("/schedule/pickup", formData);
}

// TODO: Type the response
export async function updateSchedule({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<GeneralResponse> {
  return await http.put(`/schedule/${id}`, { status });
}

export async function deleteSchedule(id: string): Promise<GeneralResponse> {
  return await http.delete(`/schedule/${id}`);
}
