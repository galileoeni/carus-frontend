/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "./http";
import { ContactInput } from "@/types/contact";

export async function postContactMail(data: ContactInput): Promise<any> {
  return await http.post("/contact", data);
}
