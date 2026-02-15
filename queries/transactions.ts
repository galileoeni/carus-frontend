import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "./query-keys";
import { getTransactions } from "@/services/transactions";

export function useGetTransaction() {
  return useQuery({
    queryKey: transactionKeys.all,
    queryFn: getTransactions,
  });
}
