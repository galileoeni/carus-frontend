import {
  contributeToCampaign,
  getCashDonation,
  startCashDonation,
  getDonationCampaign,
  getDonationCampaigns,
  getPublicCampaigns,
} from "@/services/donation";
import {
  CashDonationRequest,
  CashDonationStartResponse,
  ContributionRequest,
  ContributionResponse,
} from "@/types/donation";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

//Get List of campaigns
export const useDonationCampaigns = () =>
  useQuery({
    queryKey: ["donation-campaigns"],
    queryFn: getDonationCampaigns,
  });

//Get public campaigns (no login needed)
export const usePublicCampaigns = () =>
  useQuery({
    queryKey: ["public-campaigns"],
    queryFn: getPublicCampaigns,
  });

//Get a campaign
export const useDonationCampaign = (id: string) =>
  useQuery({
    queryKey: ["donation-campaign", id],
    queryFn: () => getDonationCampaign(id),
    enabled: !!id,
  });

//Contribute to campaign
export function useContributeToCampaign(
  options?: UseMutationOptions<
    ContributionResponse,
    Error,
    ContributionRequest
  >,
) {
  return useMutation<ContributionResponse, Error, ContributionRequest>({
    mutationFn: ({ campaignId, amount }) =>
      contributeToCampaign(campaignId, amount),

    meta: {
      successMessage: "Donation successful!",
      additionalDescription: "Thank you for your contribution.",
      errorMessage: "Failed to process donation. Please try again.",
    },

    ...options,
  });
}

//Start a card/bank donation (Paystack)
export const useStartCashDonation = () =>
  useMutation<CashDonationStartResponse, Error, CashDonationRequest>({
    mutationFn: startCashDonation,
    meta: {
      successMessage: "Taking you to secure payment...",
      errorMessage: "Couldn't start your donation.",
    },
  });

//Check a card/bank donation; keeps checking while it is still pending
export const useCashDonation = (reference: string | null) =>
  useQuery({
    queryKey: ["cash-donation", reference],
    queryFn: () => getCashDonation(reference as string),
    enabled: !!reference,
    // A missing payment won't appear on retry; other errors get one more try
    retry: (failureCount, error) =>
      error.response?.data?.status !== 404 && failureCount < 1,
    refetchInterval: (query) =>
      query.state.data?.data.status === "pending" &&
      query.state.dataUpdateCount < 10
        ? 3000
        : false,
  });
