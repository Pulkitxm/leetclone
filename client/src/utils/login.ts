import axios from "axios";
import { baseUrl } from "../config";

export const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
  const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
  const body = { email, password };

  await axios.post(baseUrl + "/api/_v1/user/login", body, {
    withCredentials: true,
  });
};