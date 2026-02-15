import { TransactionsResponse } from "@/types/transaction";
import http from "./http";

export async function getTransactions(): Promise<TransactionsResponse> {
  return (await http.get("/transactions")).data;
}
