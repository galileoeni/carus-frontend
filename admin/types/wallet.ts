import { GeneralResponse } from "@/types";
import type { Wallet } from "@/types/wallet";

export interface AdminUser {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  isAdmin: boolean;
  status: "active" | "inactive";
  createdAt?: string;
  wallet?: Wallet | null;
}

export interface AdminUsersResponse extends GeneralResponse {
  data: AdminUser[];
}

export interface TotalWalletAmount {
  total_naira_amount: number;
}

export interface TotalWalletAmountResponse extends GeneralResponse {
  data: TotalWalletAmount;
}
