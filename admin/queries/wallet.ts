import { useQuery } from "@tanstack/react-query";
import { adminGetTotalWalletAmount, adminGetUsers } from "../services/wallet";

export const useAdminUsers = () =>
  useQuery({
    queryKey: ["admin-users"],
    queryFn: adminGetUsers,
  });

export const useAdminTotalWalletAmount = () =>
  useQuery({
    queryKey: ["admin-total-wallet"],
    queryFn: adminGetTotalWalletAmount,
  });
