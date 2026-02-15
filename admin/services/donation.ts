import http from "@/services/http";
import {
  AdminDonationListResponse,
  AdminSingleDonationResponse,
} from "../types/donation";

// Get all donations (Admin)
export const adminGetDonations =
  async (): Promise<AdminDonationListResponse> => {
    const res = await http.get("/admin/donations");
    return res.data;
  };

// Get specific donation by ID (Admin)
export const adminGetDonationById = async (
  id: number,
): Promise<AdminSingleDonationResponse> => {
  const res = await http.get(`/admin/donations/${id}`);
  return res.data;
};
