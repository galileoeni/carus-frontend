import http from "./http";
import {
  ContributionResponse,
  Donation,
  DonationResponse,
} from "@/types/donation";

// Get all campaigns
export async function getDonationCampaigns(): Promise<DonationResponse> {
  const res = await http.get("/donation/campaigns");
  return res.data;
}

// Get a single campaign by ID
export async function getDonationCampaign(
  id: string,
): Promise<{ data: Donation }> {
  const res = await http.get(`/donation/campaigns/${id}`);
  return res.data;
}

// Contribute to a campaign
export async function contributeToCampaign(
  campaignId: number,
  amount: number,
): Promise<ContributionResponse> {
  const res = await http.post("/donation/contribute", {
    campaignId,
    amount,
  });
  return res.data;
}
