/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface NotificationsData {
  notifications: Notification[];
  unreadCount: number;
}

export interface GetNotificationsResponse {
  status_code: number;
  data: NotificationsData;
  errors: any[];
  message: string;
  pagination: PaginationData;
}

export interface MarkNotificationReadResponse {
  status_code: number;
  data: any;
  errors: any[];
  message: string;
}

export interface UpdateFcmTokenRequest {
  token: string;
}

export interface UpdateFcmTokenResponse {
  status_code: number;
  data: any;
  errors: any[];
  message: string;
}
