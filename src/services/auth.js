import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = (name, email, password) => {
  return api.post("/auth/register", { name, email, password });
};
