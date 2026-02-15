import { GeneralResponse } from "@/types";

export interface Transaction {
  transaction_id: string;
  amount: string;
  charges: string;
  date: string;
  type: string;
  status: string;
}

export interface AdminTransactionsResponse extends GeneralResponse {
  data: Transaction[];
}
