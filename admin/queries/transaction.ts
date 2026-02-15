import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { adminGetTransactions } from "../services/transaction";
import { AdminTransactionsResponse } from "../types/transaction";

// Fetch all transactions
export const useAdminTransactions =
  (): UseQueryResult<AdminTransactionsResponse> => {
    return useQuery<AdminTransactionsResponse>({
      queryKey: ["adminTransactions"],
      queryFn: adminGetTransactions,
    });
  };
