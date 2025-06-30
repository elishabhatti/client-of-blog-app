import axios from "axios";

export const axiosInterface = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});
