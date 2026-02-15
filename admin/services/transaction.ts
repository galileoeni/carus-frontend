import http from "@/services/http";
import { AdminTransactionsResponse } from "../types/transaction";

// Fetch all transactions
export const adminGetTransactions =
  async (): Promise<AdminTransactionsResponse> => {
    const res = await http.get("/admin/transactions");
    return res.data;
  };
