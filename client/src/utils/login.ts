import axios from "axios";
import { baseUrl } from "../config";

export const handleLogin = async (email: string, password: string) => {
  const body = { email, password };

  await axios.post(baseUrl + "/api/_v1/user/login", body, {
    withCredentials: true,
  });
};