/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneralResponse } from ".";

export interface AuthUser {
  email: string;
  status: string;
  refresh_token: string;
  refresh_token_expires: Date;
  access_token: string;
  access_token_expires: Date;
}

export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  logoutErrors: any[];
  loginErrors: any[];
  otpErrors: any[];
  registrationErrors: any[];
  user?: AuthUser | null;
  forgotPasswordError: any[];
  confirmedOtp: boolean;
  otp: string;
  otpEmail: string;
  googleSignupError: any[];
  googleEmail: string;
}

export interface LoginResponse extends GeneralResponse {
  data: AuthUser;
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface RegisterInput {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  dob: Date;
}

export interface OtpInput {
  identifier: string;
  otp: string;
}

export interface ConfirmForgotPassworOtpInput {
  email: string;
  otp: string;
}

export interface ResendOtpInput {
  email: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface OldChangePasswordInput {
  otp: string;
  email: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  newPassword: string;
  token: string;
}

export interface CompleteGoogleSignupInput {
  email: string;
  gender: string;
  phone: string;
  dob: string;
  country_code: string;
}
