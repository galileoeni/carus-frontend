/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  RedeemAirtimeInput,
  RedeemCashInput,
  RedeemResponse,
} from "@/types/redeem";
import http from "./http";

// Airtime Redemption
export async function postRedeemAirtime(
  payload: RedeemAirtimeInput,
): Promise<RedeemResponse<any>> {
  const res = await http.post("/redeem/airtime", payload);
  return res.data;
}

// Cash Redemption
export async function postRedeemCash(
  payload: RedeemCashInput,
): Promise<RedeemResponse<any>> {
  const res = await http.post("/redeem/cash", payload);
  return res.data;
}
