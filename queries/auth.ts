/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authKeys } from "@/queries/query-keys";
import {
  postLogin,
  postRegister,
  postForgotPassword,
  postOtp,
  postForgotPasswordOtp,
  postChangePassword,
  postResendOtp,
  postCompleteGoogleSignup,
} from "@/services/auth";
import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  ForgotPasswordInput,
  OtpInput,
  ConfirmForgotPassworOtpInput,
  ChangePasswordInput,
  ResendOtpInput,
  CompleteGoogleSignupInput,
} from "@/types/auth";
import { CustomError } from "@/tanstack-query";

/* Login */
export function useLogin(
  options?: UseMutationOptions<LoginResponse, any, LoginInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: LoginInput) => postLogin(data),
    meta: {
      successMessage: "Logged in successfully",
      additionalDescription: "You are being redirected...",
      errorMessage: "Error logging in",
    },
    ...options,
  });
}

/* Register */
export function useRegister(
  options?: UseMutationOptions<any, CustomError, RegisterInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: RegisterInput) => postRegister(data),
    meta: {
      successMessage: "Registration successful",
      additionalDescription: "You are being redirected to verify your email.",
      errorMessage: "Error creating your account",
    },
    ...options,
  });
}

/* Forgot password (request) */
export function useForgotPassword(
  options?: UseMutationOptions<any, any, ForgotPasswordInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => postForgotPassword(data),
    meta: {
      invalidatesQuery: authKeys.forgotPassword(),
      successMessage: "Reset email sent!",
      additionalDescription: "Kindly check your email inbox...",
      errorMessage: "Error sending reset email",
    },
    ...options,
  });
}

/* Verify OTP */
export function useVerifyOtp(
  options?: UseMutationOptions<any, any, OtpInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: OtpInput) => postOtp(data),
    meta: {
      invalidatesQuery: authKeys.verifyOtp(),
      successMessage: "OTP verified successfully!",
      additionalDescription: "You are being redirected to your dashboard.",
      errorMessage: "Error verifying OTP",
    },
    ...options,
  });
}

/* Confirm forgot-password OTP */
export function useConfirmForgotPasswordOtp(
  options?: UseMutationOptions<
    any,
    CustomError,
    ConfirmForgotPassworOtpInput,
    unknown
  >,
) {
  return useMutation({
    mutationFn: (data: ConfirmForgotPassworOtpInput) =>
      postForgotPasswordOtp(data),
    meta: {
      invalidatesQuery: authKeys.confirmForgotPassword(),
      successMessage: "OTP confirmed",
      additionalDescription: "You can now reset your password.",
      errorMessage: "Error confirming OTP",
    },
    ...options,
  });
}

/* Change password (after confirmation) */
export function useChangePassword(
  options?: UseMutationOptions<any, CustomError, ChangePasswordInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => postChangePassword(data),
    meta: {
      invalidatesQuery: authKeys.changePassword(),
      successMessage: "Password changed!",
      additionalDescription: "You can now login with your new password.",
      errorMessage: "Error changing password",
    },
    ...options,
  });
}

/* Resend OTP */
export function useResendOtp(
  options?: UseMutationOptions<any, Error, ResendOtpInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: ResendOtpInput) => postResendOtp(data),
    meta: {
      invalidatesQuery: authKeys.resendOtp(),
      successMessage: "OTP resent",
      additionalDescription: "Check your inbox.",
      errorMessage: "Error resending OTP",
    },
    ...options,
  });
}

/* Complete Google Signup */
export function useCompleteGoogleSignup(
  options?: UseMutationOptions<any, any, CompleteGoogleSignupInput, unknown>,
) {
  return useMutation({
    mutationFn: (data: CompleteGoogleSignupInput) =>
      postCompleteGoogleSignup(data),
    meta: {
      invalidatesQuery: authKeys.completeGoogleSignup(),
      successMessage: "Signup completed",
      additionalDescription: "Account created via Google.",
      errorMessage: "Error completing signup",
    },
    ...options,
  });
}
