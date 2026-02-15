import { GeneralResponse } from "@/types";

export interface Configuration {
  type: string;
  value: string;
  created_at?: string;
  updated_at?: string;
}

export interface ConfigurationResponse extends GeneralResponse {
  data: Configuration;
}

export interface ConfigurationCreateUpdateRequest {
  type?: string;
  value: string;
}

export interface PointToNairaResponse extends GeneralResponse {
  data: {
    value: string;
  };
}
