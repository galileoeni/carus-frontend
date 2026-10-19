import http from "./http";
import { GeneralResponse } from "@/types";

export interface ImpactResponse extends GeneralResponse {
  data: { plasticKg: number; updatedAt: string | null };
}

// Public headline figures for the impact page (no login needed)
export async function getImpact(): Promise<ImpactResponse> {
  const res = await http.get("/configurations/impact");
  return res.data;
}
