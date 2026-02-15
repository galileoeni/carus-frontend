import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { adminGetDonations, adminGetDonationById } from "../services/donation";
import {
  AdminDonationListResponse,
  AdminSingleDonationResponse,
} from "../types/donation";

// Fetch all donations
export const useAdminDonations =
  (): UseQueryResult<AdminDonationListResponse> => {
    return useQuery<AdminDonationListResponse>({
      queryKey: ["adminDonations"],
      queryFn: adminGetDonations,
    });
  };

// Fetch a single donation by ID
export const useAdminDonationById = (
  id: number,
): UseQueryResult<AdminSingleDonationResponse> => {
  return useQuery<AdminSingleDonationResponse>({
    queryKey: ["adminDonation", id],
    queryFn: () => adminGetDonationById(id),
    enabled: !!id,
  });
};
