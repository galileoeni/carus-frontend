"use client";

import {
  getNotifications,
  markNotificationAsRead,
  updateFcmToken,
} from "@/services/notifications";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notificationKeys } from "./query-keys";
import {
  GetNotificationsResponse,
  MarkNotificationReadResponse,
  UpdateFcmTokenRequest,
  UpdateFcmTokenResponse,
} from "@/types/notifications";

export function useNotifications(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: notificationKeys.list(page, pageSize),
    queryFn: () => getNotifications(page, pageSize),
  });
}

export function useInfiniteNotifications(pageSize: number = 10) {
  return useInfiniteQuery<
    GetNotificationsResponse,
    any,
    InfiniteData<GetNotificationsResponse>,
    string[],
    number
  >({
    queryKey: [...notificationKeys.all, "infinite"],
    queryFn: ({ pageParam }) => getNotifications(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}

export function useMarkAsRead(
  options?: UseMutationOptions<
    MarkNotificationReadResponse,
    any,
    string,
    unknown
  >,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options || {};

  return useMutation({
    ...restOptions,
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [...notificationKeys.all, "infinite"],
      });
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    meta: {
      successMessage: "Notification marked as read",
      errorMessage: "Error marking notification as read",
      ...restOptions.meta,
    },
  });
}

export function useUpdateFcmToken(
  options?: UseMutationOptions<
    UpdateFcmTokenResponse,
    any,
    UpdateFcmTokenRequest,
    unknown
  >,
) {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateFcmTokenRequest) => updateFcmToken(data),
    meta: {
      successMessage: "FCM token updated successfully",
      errorMessage: "Error updating FCM token",
      ...options?.meta,
    },
  });
}
