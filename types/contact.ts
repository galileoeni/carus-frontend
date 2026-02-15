/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContactState {
  isLoading: boolean;
  errors: any[];
  isSent: boolean;
  contact: any;
}

export interface ContactResponse {
  status: number;
  data: any;
  error: any[];
  message: string;
}

export interface ContactInput {
  message: string;
}
