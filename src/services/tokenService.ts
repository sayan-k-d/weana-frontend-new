import axios from "axios";
import { SESSION_TOKEN_KEY } from "@/lib/axios";

interface TokenResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

export const generateToken = async (): Promise<TokenResponse> => {
  const { data } = await axios.post<TokenResponse>("/api/generate-cms-token");
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
  }
  return data;
};

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
};

export const clearToken = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }
};
