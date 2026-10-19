import { GeneralResponse } from ".";

export interface Donation {
  id: number;
  title: string;
  description: string;
  target: number;
  days_left?: number;
  image?: string;
  amountRaised: number;
  numberOfDonors: number;
}

export interface DonationResponse extends GeneralResponse {
  data: Donation[];
}

export interface ContributionRequest {
  campaignId: number;
  amount: number;
}

export interface ContributionResponse {
  status: number;
  message: string;
  data: {
    id: string;
    amount: number;
    donation: Donation;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PublicCampaign {
  id: string;
  title: string;
  description: string;
  target: number;
  duration: string;
  image?: string | null;
  status: "active" | "completed";
  createdAt: string;
  amountRaised: number;
  numberOfDonors: number;
}

export interface PublicCampaignsResponse extends GeneralResponse {
  data: PublicCampaign[];
}

export interface CashDonationRequest {
  campaignId: string;
  name: string;
  email: string;
  amount: number;
}

export interface CashDonationStartResponse extends GeneralResponse {
  data: { authorizationUrl: string; reference: string };
}

export interface CashDonationStatusResponse extends GeneralResponse {
  data: {
    reference: string;
    status: "pending" | "success" | "failed";
    amount: number;
    donorName: string;
    campaign: { id: string; title: string };
  };
}
