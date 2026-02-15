/* eslint-disable @typescript-eslint/no-explicit-any */

import http from "@/services/http";
import {
  AdminDashboardData,
  AdminLoginInput,
  ApiResponse,
  CreateAdminInput,
  User,
} from "../types/auth";
import { AuthUser } from "@/types/auth";

/* Login */
export async function postAdminLogin(
  formData: AdminLoginInput,
): Promise<ApiResponse<AuthUser>> {
  return (await http.post("/admin/login", formData)).data;
}

/* Register */
export async function postAdminRegister(
  formData: CreateAdminInput,
): Promise<any> {
  return (await http.post("/admin/create-admin", formData)).data;
}

/*Admin Dashboard */
export async function getAdminDashboard(): Promise<
  ApiResponse<AdminDashboardData>
> {
  const res = await http.get("/admin/dashboard");
  return res.data;
}

/* Assign Admin Role */
export async function assignAdminRole(
  userId: string,
): Promise<ApiResponse<User>> {
  const res = await http.patch(`/admin/assign-admin/${userId}`);
  return res.data;
}

/* Remove Admin ROle */
export async function removeAdminRole(
  userId: string,
): Promise<ApiResponse<User>> {
  const res = await http.patch(`/admin/remove-admin/${userId}`);
  return res.data;
}

/* Remove Admin Role */
export async function toggleUserStatus(
  userId: string,
): Promise<ApiResponse<User>> {
  const res = await http.patch(`/admin/toggle-user-status/${userId}`);
  return res.data;
}
