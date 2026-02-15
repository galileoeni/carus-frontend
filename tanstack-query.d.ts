import "@tanstack/react-query";

// Define the shape of your API error response data
export interface MyErrorResponseData {
  message: string;
  status: number;
}

// Augment the built-in Error interface to include the `response` property
// from Axios or other fetch libraries.
export interface CustomError extends Error {
  response?: {
    data?: MyErrorResponseData;
  };
}
