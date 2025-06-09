import axios from "axios";

export const fetchClient = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true, // send cookies with requests
});
