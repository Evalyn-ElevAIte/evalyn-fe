import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const getUser = () => {
  return api.get("/user/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

