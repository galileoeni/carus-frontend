import {
  deleteSchedule,
  getSchedule,
  getScheduleById,
  postSchedulePickup,
  updateSchedule,
} from "@/services/schedule";
import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { scheduleKeys } from "./query-keys";
import {
  PostScheduleResponse,
  SchedulePickupInput,
  UpdateSchedulePayload,
} from "@/types/schedule";
import { GeneralResponse } from "@/types";
import { CustomError } from "@/tanstack-query";

export function useGetSchedule() {
  return useQuery({
    queryKey: scheduleKeys.all,
    queryFn: getSchedule,
  });
}

export function useGetScheduleByIdQueryOptions(scheduleId: string) {
  return queryOptions({
    queryKey: scheduleKeys.id(scheduleId),
    queryFn: () => getScheduleById(scheduleId),
    enabled: !!scheduleId,
  });
}

export function usePostSchedulePickup(
  options?: UseMutationOptions<PostScheduleResponse, CustomError, FormData>,
) {
  return useMutation({
    mutationFn: (data: FormData) => postSchedulePickup(data),
    meta: {
      invalidatesQuery: scheduleKeys.pickup(),
      successMessage: "Pickup Scheduled!",
      additionalDescription: "Your pickup has been scheduled successfully.",
      errorMessage: "Error scheduling pickup",
    },
    ...options,
  });
}

export function useUpdateSchedule(
  options?: UseMutationOptions<
    GeneralResponse,
    CustomError,
    UpdateSchedulePayload
  >,
) {
  return useMutation({
    mutationFn: (data) => updateSchedule(data),
    meta: {
      invalidatesQuery: scheduleKeys.all,
      successMessage: "Schedule status updated!",
      additionalDescription:
        "Your schedule status has been updated successfully.",
      errorMessage: "Error updating schedule status",
    },
    ...options,
  });
}

export function useDeleteSchedule(
  options?: UseMutationOptions<GeneralResponse, CustomError, string>,
) {
  return useMutation({
    mutationFn: (id) => deleteSchedule(id),
    meta: {
      invalidatesQuery: scheduleKeys.all,
      successMessage: "Pickup Schedule Deleted!",
      additionalDescription:
        "Your pickup schedule has been deleted successfully.",
      errorMessage: "Error deleting schedule status",
    },
    ...options,
  });
}
