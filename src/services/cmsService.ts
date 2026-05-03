import axios from "axios";
import { getStoredToken } from "./tokenService";

interface AdminLoginResponse {
  success: boolean;
  redirect: string;
}

export const cmsAdminLogin = async (): Promise<AdminLoginResponse> => {
  const token = getStoredToken();

  const { data } = await axios.post<AdminLoginResponse>(
    "/api/cms-admin-login",
    null,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    },
  );
  return data;
};
