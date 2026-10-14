import http from "./http";

export interface ChatbotMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatbotResponse {
  response: string;
  error?: string;
}

/**
 * Send message to chatbot
 * Path: /api/v1/chatbot/message
 */
export const sendChatbotMessage = async (
  message: string,
  sessionId: string = "default",
): Promise<ChatbotResponse> => {
  const res = await http.post("/chatbot/message", {
    message,
    sessionId,
  });
  return res.data;
};

/**
 * Send feedback about chatbot response
 * Path: /api/v1/chatbot/feedback
 */
export const sendChatbotFeedback = async (
  sessionId: string,
  message: string,
  feedback: "positive" | "negative",
): Promise<{ success: boolean; message: string }> => {
  const res = await http.post("/chatbot/feedback", {
    sessionId,
    message,
    feedback,
  });
  return res.data;
};

/**
 * Clear chat history for a session
 * Path: /api/v1/chatbot/history/:sessionId
 */
export const clearChatHistory = async (
  sessionId: string,
): Promise<{ success: boolean; message: string }> => {
  const res = await http.delete(`/chatbot/history/${sessionId}`);
  return res.data;
};
