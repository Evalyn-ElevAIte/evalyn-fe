import axios from "axios";

export const api = axios.create({
  baseURL: "https://evalyn-backend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
