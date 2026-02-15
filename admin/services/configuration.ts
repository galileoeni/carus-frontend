import http from "@/services/http";
import {
  ConfigurationResponse,
  ConfigurationCreateUpdateRequest,
  PointToNairaResponse,
} from "../types/configuration";

// Create a new configuration
export const adminCreateConfiguration = async (
  payload: ConfigurationCreateUpdateRequest,
): Promise<ConfigurationResponse> => {
  const res = await http.post("/admin/configurations", payload);
  return res.data;
};

// Update a configuration
export const adminUpdateConfiguration = async (
  type: string,
  payload: Omit<ConfigurationCreateUpdateRequest, "type">,
): Promise<ConfigurationResponse> => {
  const res = await http.put(`/admin/configurations/${type}`, payload);
  return res.data;
};

// Get point-to-naira conversion rate
export const adminGetPointToNaira = async (): Promise<PointToNairaResponse> => {
  const res = await http.get("/admin/configurations/point-to-naira");
  return res.data;
};

// Set point-to-naira conversion rate
export const adminSetPointToNaira = async (
  value: string,
): Promise<PointToNairaResponse> => {
  const res = await http.post("/admin/configurations/point-to-naira", {
    value,
  });
  return res.data;
};
