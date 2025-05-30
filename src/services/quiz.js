import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const creatQuizWithQuestions = (payload) => {
  return api.post("/quiz/create-with-questions", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
