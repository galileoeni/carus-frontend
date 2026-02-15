/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneralResponse } from ".";

export interface Account {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  phone: string;
  address: string;
  role: string;
  avatar: string;
  gender: string;
  created_at: string;
  last_updated: string;
  city: string;
  region: string;
  wallet: {
    naira_amount: string;
    points: string;
    last_transaction_time: string;
  };
}

export interface GetAccountResponse extends GeneralResponse {
  data: Account;
}

// Define a new type with only the properties you need
export type UserInfo = Pick<
  Account,
  "first_name" | "last_name" | "email" | "phone" | "address" | "avatar"
>;

export interface AccountState {
  isEdited: boolean;
  isLoadingEditProfile: boolean;
  editProfileError: any[];
}

export interface EditProfileResponseData {
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  address: string | null;
  region: string | null;
  city: string | null;
  last_updated: string;
}

export interface EditProfileResponse extends GeneralResponse {
  data: EditProfileResponseData;
}
export interface EditProfileInput {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  email?: string;
  region?: string;
  city?: string;
}

export enum RegionEnum {
  LAGOS = "Lagos",
}

export enum CityEnum {
  SURULERE_ADENIRAN = "Surulere (Adeniran Ogunsanya)",
  SURULERE_AGUDA = "Surulere (Aguda)",
  SURULERE_BODE = "Surulere (Bode Thomas)",
  SURULERE_IDI = "Surulere (Idi Araba)",
  SURULERE_IPONRI = "Surulere (Iponri)",
  SURULERE_ITIRE = "Surulere (Itire)",
  SURULERE_IJESHA = "Surulere (Ijesha)",
  SURULERE_LAWANSON = "Surulere (Lawanson)",
  SURULERE_MASHA = "Surulere (Masha)",
  SURULERE_OGUNLANA_DRIVE = "Surulere (Ogunlana Drive)",
  SURULERE_OJUELEGBA = "Surulere (Ojuelegba)",
}

export interface AccountResponse extends GeneralResponse {
  data: Account;
}

export interface NewPasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Complaint {
  message: string;
}

export interface ComplaintResponse extends GeneralResponse {
  data: Complaint;
}
