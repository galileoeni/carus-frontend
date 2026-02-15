import http from "@/services/http";
import { AdminUsersResponse, TotalWalletAmountResponse } from "../types/wallet";

export const adminGetUsers = async (): Promise<AdminUsersResponse> => {
  const res = await http.get("/admin/accounts");
  return res.data;
};

export const adminGetTotalWalletAmount =
  async (): Promise<TotalWalletAmountResponse> => {
    const res = await http.get("/admin/total-wallet-amount");
    return res.data;
  };
