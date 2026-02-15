/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from "./cookie";
import http from "./http";
import {
  AuthUser,
  ChangePasswordInput,
  CompleteGoogleSignupInput,
  ConfirmForgotPassworOtpInput,
  ForgotPasswordInput,
  LoginInput,
  LoginResponse,
  OtpInput,
  RegisterInput,
  ResendOtpInput,
} from "@/types/auth";

export async function postLogin(formData: LoginInput): Promise<LoginResponse> {
  return (await http.post("/auth/login-user", formData)).data;
}

export async function postRegister(formData: RegisterInput): Promise<any> {
  return (await http.post("/auth/register-user", formData)).data;
}

export async function postForgotPassword(
  formData: ForgotPasswordInput,
): Promise<any> {
  return (await http.post("/auth/forgot-password", formData)).data;
}

export async function postOtp(formData: OtpInput): Promise<any> {
  return (await http.post("/auth/verify-user", formData)).data;
}

export async function postForgotPasswordOtp(
  formData: ConfirmForgotPassworOtpInput,
): Promise<any> {
  return (await http.post("/auth/forgot-password/confirm", formData)).data;
}

export async function postChangePassword(
  formData: ChangePasswordInput,
): Promise<any> {
  return (await http.post("/auth/password/reset", formData)).data;
}

export async function postResendOtp(formData: ResendOtpInput): Promise<any> {
  return (await http.post("/auth/resend-verification-otp", formData)).data;
}

export async function postCompleteGoogleSignup(
  formData: CompleteGoogleSignupInput,
): Promise<any> {
  return (await http.post("/auth/google-signup/complete", formData)).data;
}
/**
 * Get the auth token or false
 */
export function getAuthToken() {
  return getAuthAccount() ? getAuthAccount()?.access_token : false;
}

/**
 * Get authenticated account
 */
export function getAuthAccount(): AuthUser | null {
  return cookie.get("auth-user");
}
