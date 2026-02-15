import http from "@/services/http";
import { PointToNairaResponse } from "@/types/configuration";

// export async function getConfigurations(): Promise<ConfigurationsResponse> {
//   return (await http.get("/configurations")).data;
// }

export async function getPointToNairaRate(): Promise<PointToNairaResponse> {
  return (await http.get("/configurations/point-to-naira")).data;
}

// export async function getLocationConfig(): Promise<LocationConfigResponse> {
//   return (await http.get("/configurations/location")).data;
// }
