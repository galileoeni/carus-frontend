import {
  GetNotificationsResponse,
  MarkNotificationReadResponse,
  UpdateFcmTokenRequest,
  UpdateFcmTokenResponse,
} from "@/types/notifications";
import http from "./http";

export async function getNotifications(
  page: number = 1,
  pageSize: number = 10,
): Promise<GetNotificationsResponse> {
  return (
    await http.get("/account/notifications", {
      params: { page, pageSize },
    })
  ).data;
}

export async function markNotificationAsRead(
  id: string,
): Promise<MarkNotificationReadResponse> {
  return (await http.patch(`/account/notifications/${id}/read`)).data;
}

export async function updateFcmToken(
  data: UpdateFcmTokenRequest,
): Promise<UpdateFcmTokenResponse> {
  return (await http.post("/account/notifications/token", data)).data;
}
