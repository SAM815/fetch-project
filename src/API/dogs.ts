import { fetchClient } from "./fetchClient";

export const fetchBreeds = async (): Promise<string[]> => {
  const res = await fetchClient.get("/dogs/breeds");
  return res.data;
};

export const searchDogs = async (query: string) => {
  const res = await fetchClient.get(`/dogs/search?${query}`);
  return res.data;
};

export const getDogsByIds = async (ids: string[]) => {
  const res = await fetchClient.post("/dogs", ids);
  return res.data;
};

export const matchDog = async (ids: string[]) => {
  const res = await fetchClient.post("/dogs/match", ids);
  return res.data; // { match: string }
};
