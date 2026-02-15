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
