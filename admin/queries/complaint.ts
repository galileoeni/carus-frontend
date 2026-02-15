import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { adminGetComplaints } from "../services/complaint";
import { AdminComplaintsResponse } from "../types/complaint";

// Fetch all complaints
export const useAdminComplaints =
  (): UseQueryResult<AdminComplaintsResponse> => {
    return useQuery<AdminComplaintsResponse>({
      queryKey: ["adminComplaints"],
      queryFn: adminGetComplaints,
    });
  };
