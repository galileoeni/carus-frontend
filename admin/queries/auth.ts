/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  assignAdminRole,
  postAdminLogin,
  toggleUserStatus,
} from "../services/auth";
import type {
  AdminLoginInput,
  ApiResponse,
  AuthUser,
  User,
} from "../types/auth";
import { CustomError } from "@/tanstack-query";

/* Login */
export function useAdminLogin(
  options?: UseMutationOptions<
    ApiResponse<AuthUser>,
    any,
    AdminLoginInput,
    unknown
  >,
) {
  return useMutation({
    mutationFn: (data: AdminLoginInput) => postAdminLogin(data),
    meta: {
      successMessage: "Logged in successfully",
      additionalDescription: "You are being redirected...",
      errorMessage: "Error logging in",
    },
    ...options,
  });
}

/* Create Admin */
export function useCreateAdmin(
  options?: UseMutationOptions<any, CustomError, AdminLoginInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: AdminLoginInput) => postAdminLogin(data),
    meta: {
      successMessage: "Registration successful",
      additionalDescription: "You are being redirected to verify your email.",
      errorMessage: "Error creating your account",
    },
    ...options,
  });
}

/* Admin Roles */
export function useAssignAdmin() {
  return useMutation<ApiResponse<User>, any, string>({
    mutationFn: (userId: string) => assignAdminRole(userId),
    meta: {
      successMessage: "Admin role assigned successfully",
      errorMessage: "Failed to assign admin role",
    },
  });
}

/* Toggle User Status */
export function useToggleUserStatus() {
  return useMutation<ApiResponse<User>, any, string>({
    mutationFn: (userId: string) => toggleUserStatus(userId),
    meta: {
      successMessage: "User Status Updated!",
      errorMessage: "Failed to update status",
    },
  });
}
