import { GeneralResponse } from "@/types";

export interface AdminDonation {
  id: number;
  title: string;
  description: string;
  goal_amount: number;
  collected_amount: number;
  days_left?: number;
  image?: string;
  donations_count?: number;
  created_at: string;
  updated_at: string;
}

export interface AdminDonationListResponse extends GeneralResponse {
  data: AdminDonation[];
}

export interface AdminSingleDonationResponse extends GeneralResponse {
  data: AdminDonation;
}
