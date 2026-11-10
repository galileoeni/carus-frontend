import http from "./http";
import type {
  BranchDetailResponse,
  BranchInviteInfoResponse,
  BranchesResponse,
  JoinBranchInput,
  BusinessDataResponse,
  BusinessMeResponse,
  BusinessScheduleResponse,
  QuickPickupInput,
  BusinessRegisterInput,
  BusinessSessionResponse,
} from "@/types/business";
import type { GeneralResponse } from "@/types";

export async function postBusinessRegister(
  body: BusinessRegisterInput,
): Promise<GeneralResponse> {
  return (await http.post("/business/auth/register", body)).data;
}

export async function postBusinessVerify(body: {
  identifier: string;
  otp: string;
}): Promise<BusinessSessionResponse> {
  return (await http.post("/business/auth/verify", body)).data;
}

export async function postBusinessLogin(body: {
  identifier: string;
  password: string;
}): Promise<BusinessSessionResponse> {
  return (await http.post("/business/auth/login", body)).data;
}

export async function getBusinessMe(): Promise<BusinessMeResponse> {
  return (await http.get("/business/me")).data;
}

export async function getBusinessSchedule(): Promise<BusinessScheduleResponse> {
  return (await http.get("/business/schedule")).data;
}

export async function postQuickPickup(
  body: QuickPickupInput,
): Promise<GeneralResponse> {
  return (await http.post("/business/pickups", body)).data;
}

export async function postCancelPickup(id: string): Promise<GeneralResponse> {
  return (await http.post(`/business/pickups/${id}/cancel`)).data;
}

export async function getBusinessData(): Promise<BusinessDataResponse> {
  return (await http.get("/business/data")).data;
}

/* ---------- Locations ---------- */

export async function getBranches(): Promise<BranchesResponse> {
  return (await http.get("/business/branches")).data;
}

export async function getBranchDetail(
  id: string,
): Promise<BranchDetailResponse> {
  return (await http.get(`/business/branches/${id}`)).data;
}

export async function postBranchInvite(body: {
  branchName?: string;
}): Promise<GeneralResponse> {
  return (await http.post("/business/branch-invites", body)).data;
}

export async function deleteBranchInvite(id: string): Promise<GeneralResponse> {
  return (await http.delete(`/business/branch-invites/${id}`)).data;
}

export async function getBranchInviteInfo(
  token: string,
): Promise<BranchInviteInfoResponse> {
  return (await http.get(`/business/join/${encodeURIComponent(token)}`)).data;
}

export async function postJoinBranch({
  token,
  ...body
}: JoinBranchInput & { token: string }): Promise<GeneralResponse> {
  return (await http.post(`/business/join/${encodeURIComponent(token)}`, body))
    .data;
}
