import { GeneralResponse } from ".";

export type TransactionStatusTypes =
  | "pending"
  | "fulfilled"
  | "cancelled"
  | "paid"
  | "declined"
  | "approved"
  | "completed";
export interface Transactions {
  transaction_id: string;
  amount: string;
  charges: string;
  date: string;
  type: "airtime" | "cash";
  direction: "debit" | "credit";
  status:
    | "pending"
    | "fulfilled"
    | "cancelled"
    | "paid"
    | "declined"
    | "approved";
  description: string;
}

export interface TransactionsResponse extends GeneralResponse {
  data: Transactions[];
}
