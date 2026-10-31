import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getBusinessData,
  getBusinessMe,
  getBusinessSchedule,
  postCancelPickup,
  postQuickPickup,
  postBusinessLogin,
  postBusinessRegister,
  postBusinessVerify,
} from "@/services/business";
import { postResendOtp } from "@/services/auth";

export const useBusinessRegister = () =>
  useMutation({
    mutationFn: postBusinessRegister,
    meta: {
      successMessage: "Account created",
      additionalDescription: "We've emailed you a 6-digit code.",
      errorMessage: "Couldn't create your account.",
    },
  });

export const useBusinessVerify = () =>
  useMutation({
    mutationFn: postBusinessVerify,
    meta: {
      successMessage: "Email verified",
      additionalDescription: "Welcome to Carus for Business!",
      errorMessage: "Couldn't verify your email.",
    },
  });

export const useBusinessLogin = () =>
  useMutation({
    mutationFn: postBusinessLogin,
    meta: {
      successMessage: "Welcome back",
      errorMessage: "Couldn't log you in.",
    },
  });

export const useBusinessResendOtp = () =>
  useMutation({
    mutationFn: (email: string) => postResendOtp({ email }),
    meta: {
      successMessage: "Code sent",
      additionalDescription: "Check your inbox for a new code.",
      errorMessage: "Couldn't resend the code.",
    },
  });

export const useBusinessMe = () =>
  useQuery({
    queryKey: ["business-me"],
    queryFn: getBusinessMe,
    retry: false,
  });

export const useBusinessSchedule = () =>
  useQuery({
    queryKey: ["business-schedule"],
    queryFn: getBusinessSchedule,
  });

export const useQuickPickup = () =>
  useMutation({
    mutationFn: postQuickPickup,
    meta: {
      invalidatesQuery: ["business-schedule"],
      successMessage: "Pickup requested",
      additionalDescription: "We'll confirm it shortly.",
      errorMessage: "Couldn't request the pickup.",
    },
  });

export const useCancelPickup = () =>
  useMutation({
    mutationFn: postCancelPickup,
    meta: {
      invalidatesQuery: ["business-schedule"],
      successMessage: "Pickup cancelled",
      errorMessage: "Couldn't cancel the pickup.",
    },
  });

export const useBusinessData = () =>
  useQuery({ queryKey: ["business-data"], queryFn: getBusinessData });
