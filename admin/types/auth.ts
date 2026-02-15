/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AuthUser {
  email: string;
  status: string;
  refresh_token: string;
  refresh_token_expires: Date;
  access_token: string;
  access_token_expires: Date;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
}

export interface ApiResponse<T> {
  status_code: number;
  data: AuthUser;
  errors: T;
  message: string;
}

export interface AdminLoginInput {
  identifier: string;
  password: string;
}

export interface CreateAdminInput {
  email: string;
  password: string;
}

export interface AdminDashboardData {
  userCount: number;
  scheduleCount: number;
  totalWalletAmount: number;
}

export interface AdminRoleResponse {
  status_code: number;
  data: any;
  errors: any[];
  message: string;
}
