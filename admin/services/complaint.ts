import http from "@/services/http";
import { AdminComplaintsResponse } from "../types/complaint";

// Fetch all complaints
export const adminGetComplaints =
  async (): Promise<AdminComplaintsResponse> => {
    const res = await http.get("/admin/complaints");
    return res.data;
  };
