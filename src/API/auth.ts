import { fetchClient } from "./fetchClient";

export const login = async (name: string, email: string) => {
  const response = await fetchClient.post("/auth/login", { name, email });
  console.log(response.data);
  return response.data;
};
