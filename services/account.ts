import {
  Complaint,
  ComplaintResponse,
  EditProfileInput,
  EditProfileResponse,
  GetAccountResponse,
  NewPasswordInput,
} from "@/types/account";
import http from "./http";

export async function getProfile(): Promise<GetAccountResponse> {
  return (await http.get("/account")).data;
}

export async function postEditProfile(
  formData: FormData,
): Promise<EditProfileResponse> {
  return (await http.put("/account/edit", formData)).data;
}

export async function changePassword(
  formData: NewPasswordInput,
): Promise<EditProfileResponse> {
  return (await http.put("/account/change-password", formData)).data;
}

export async function postComplaint(
  data: Complaint,
): Promise<ComplaintResponse> {
  return (await http.post("/account/lodge-complaint", data)).data;
}
