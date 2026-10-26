import http from "./http";
import {
  CashDonationRequest,
  CashDonationStartResponse,
  CashDonationStatusResponse,
  ContributionResponse,
  Donation,
  DonationResponse,
  PublicCampaignsResponse,
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

// Public campaigns (no login needed)
export async function getPublicCampaigns(): Promise<PublicCampaignsResponse> {
  const res = await http.get("/donation/public/campaigns");
  return res.data;
}

// Start a card/bank donation; returns the Paystack checkout URL
export async function startCashDonation({
  campaignId,
  ...body
}: CashDonationRequest): Promise<CashDonationStartResponse> {
  const res = await http.post(
    `/donation/public/campaigns/${campaignId}/pay`,
    body,
  );
  return res.data;
}

// Check a card/bank donation after returning from Paystack
export async function getCashDonation(
  reference: string,
): Promise<CashDonationStatusResponse> {
  const res = await http.get(
    `/donation/public/payments/${encodeURIComponent(reference)}`,
  );
  return res.data;
}
