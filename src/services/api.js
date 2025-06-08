import axios from "axios";

export const api = axios.create({
  baseURL: "https://evalyn-backend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercept every request to add the Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("evalyn_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
