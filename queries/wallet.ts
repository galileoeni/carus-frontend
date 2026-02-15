import { getWallet } from "@/services/wallet";
import { useQuery } from "@tanstack/react-query";
import { walletKeys } from "./query-keys";

export function useWallet() {
  return useQuery({
    queryKey: walletKeys.all,
    queryFn: getWallet,
  });
}
