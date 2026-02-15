export interface RedeemAirtimeInput {
  network: string;
  points: number;
  phoneNumber: string;
}

export interface RedeemCashInput {
  points: number;
  accountNumber: string;
  bankName: string;
  accountName: string;
}

export interface RedeemResponse<T = unknown> {
  status_code: number;
  data: T;
  errors: unknown[];
  message: string;
}
