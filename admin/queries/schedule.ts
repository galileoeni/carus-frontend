/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AdminAcceptScheduleResponse,
  AdminCancelScheduleResponse,
  AdminFulfillScheduleInput,
  AdminFulfillScheduleResponse,
  AdminGetAllSchedulesResponse,
} from "../types/schedule";
import {
  adminAcceptSchedule,
  adminCancelSchedule,
  adminFulfillSchedule,
  adminGetSchedules,
} from "../services/schedule";

/* Accept Schedule */
export function useAdminAcceptSchedule() {
  return useMutation<AdminAcceptScheduleResponse, any, string>({
    mutationFn: (id) => adminAcceptSchedule(id),
    meta: {
      successMessage: "Schedule accepted successfully",
      errorMessage: "Failed to accept schedule",
    },
  });
}

/* Cancel Schedule */
export function useAdminCancelSchedule() {
  return useMutation<AdminCancelScheduleResponse, any, string>({
    mutationFn: (id) => adminCancelSchedule(id),
    meta: {
      successMessage: "Schedule cancelled successfully",
      errorMessage: "Failed to cancel schedule",
    },
  });
}

/* Fulfill Schedule */
export function useAdminFulfillSchedule() {
  return useMutation<
    AdminFulfillScheduleResponse,
    any,
    { id: string; payload: AdminFulfillScheduleInput }
  >({
    mutationFn: ({ id, payload }) => adminFulfillSchedule(id, payload),
    meta: {
      successMessage: "Schedule fulfilled successfully",
      errorMessage: "Failed to fulfill schedule",
    },
  });
}

/* Get all Schedules */
export function useAdminSchedules() {
  return useQuery<AdminGetAllSchedulesResponse>({
    queryKey: ["admin-schedules"],
    queryFn: adminGetSchedules,
  });
}
