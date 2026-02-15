import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import {
  adminCreateConfiguration,
  adminUpdateConfiguration,
  adminGetPointToNaira,
  adminSetPointToNaira,
} from "../services/configuration";
import {
  ConfigurationResponse,
  PointToNairaResponse,
  ConfigurationCreateUpdateRequest,
} from "../types/configuration";

/// Create a new configuration
export const useCreateConfiguration = () => {
  return useMutation<
    ConfigurationResponse,
    unknown,
    ConfigurationCreateUpdateRequest
  >({
    mutationFn: (payload) => adminCreateConfiguration(payload),
  });
};

// Update existing configuration
export const useUpdateConfiguration = () => {
  return useMutation<
    ConfigurationResponse,
    unknown,
    { type: string; value: string }
  >({
    mutationFn: ({ type, value }) => adminUpdateConfiguration(type, { value }),
  });
};

// Fetch point-to-naira rate
export const usePointToNaira = (): UseQueryResult<PointToNairaResponse> =>
  useQuery({
    queryKey: ["pointToNaira"],
    queryFn: adminGetPointToNaira,
  });

// Set point-to-naira
export const useSetPointToNaira = () => {
  return useMutation<PointToNairaResponse, unknown, string>({
    mutationFn: (value) => adminSetPointToNaira(value),
  });
};
