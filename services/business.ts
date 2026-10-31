import http from "./http";
import type {
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
