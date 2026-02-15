import { GeneralResponse } from "@/types";

export interface Complaint {
  message: string;
}

export interface AdminComplaintsResponse extends GeneralResponse {
  data: Complaint[];
}
