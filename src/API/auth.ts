import { fetchClient } from "./fetchClient";
import axios from "axios";

export const login = async (name: string, email: string) => {
  const response = await fetchClient.post("/auth/login", { name, email });
  console.log(response.data);
  return response.data;
};

export const logoutUser = async () => {
  await axios.post(
    "https://frontend-take-home-service.fetch.com/auth/logout",
    {},
    { withCredentials: true }
  );
};