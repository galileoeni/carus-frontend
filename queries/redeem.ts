import { postRedeemAirtime, postRedeemCash } from "@/services/redeem";
import {
  RedeemAirtimeInput,
  RedeemCashInput,
  RedeemResponse,
} from "@/types/redeem";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// Airtime Mutation
export function useRedeemAirtime(
  options?: UseMutationOptions<RedeemResponse, Error, RedeemAirtimeInput>,
) {
  return useMutation({
    mutationFn: (data: RedeemAirtimeInput) => postRedeemAirtime(data),
    meta: {
      successMessage: "Success!",
      additionalDescription:
        "You will be credited once your request is approved.",
      errorMessage: "Error redeeming point to airtime",
    },
    ...options,
  });
}

// Cash Mutation
export function useRedeemCash(
  options?: UseMutationOptions<RedeemResponse, Error, RedeemCashInput>,
) {
  return useMutation({
    mutationFn: (data: RedeemCashInput) => postRedeemCash(data),
    meta: {
      successMessage: "Success!",
      additionalDescription:
        "You will be credited once your request is approved.",
      errorMessage: "Error redeeming point to cash",
    },
    ...options,
  });
}
