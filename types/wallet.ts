import { GeneralResponse } from ".";

export interface Wallet {
  id: string;
  naira_amount: string;
  points: string;
  last_transaction_time: string;
  token: string;
}

export interface WalletResponse extends GeneralResponse {
  data: Wallet;
}
