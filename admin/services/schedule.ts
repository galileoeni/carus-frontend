import http from "@/services/http";
import {
  AdminAcceptScheduleResponse,
  AdminCancelScheduleResponse,
  AdminFulfillScheduleInput,
  AdminFulfillScheduleResponse,
  AdminGetAllSchedulesResponse,
} from "../types/schedule";

/* Accept schedule */
export async function adminAcceptSchedule(
  id: string,
): Promise<AdminAcceptScheduleResponse> {
  return (await http.put(`/admin/schedule/accept/${id}`)).data;
}

/* Cancel schedule */
export async function adminCancelSchedule(
  id: string,
): Promise<AdminCancelScheduleResponse> {
  return (await http.put(`/admin/schedule/cancel/${id}`)).data;
}

/* Fulfill schedule */
export async function adminFulfillSchedule(
  id: string,
  payload: AdminFulfillScheduleInput,
): Promise<AdminFulfillScheduleResponse> {
  return (await http.post(`/admin/schedule/fulfill/${id}`, payload)).data;
}

/* Get all schedules */
export async function adminGetSchedules(): Promise<AdminGetAllSchedulesResponse> {
  return (await http.get("/admin/schedules")).data;
}
