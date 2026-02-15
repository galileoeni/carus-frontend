export interface GeneralResponse {
  status_code: number;
  message: string;
  errors: string[];
}

export interface PointToNairaConfig {
  id: number;
  type: string;
  value: string;
}

export interface PointToNairaResponse extends GeneralResponse {
  data: PointToNairaConfig;
}
