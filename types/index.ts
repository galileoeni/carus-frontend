/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GeneralResponse {
  error: any[];
  status: number;
  message: string;
}

export type LogoutReason = "expired" | "user" | "forced" | "unknown";
