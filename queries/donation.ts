import {
  contributeToCampaign,
  getDonationCampaign,
  getDonationCampaigns,
} from "@/services/donation";
import { ContributionRequest, ContributionResponse } from "@/types/donation";
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
