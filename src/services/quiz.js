import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const creatQuizWithQuestions = (payload) => {
  return api.post("/quiz/create-with-questions", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getQuizById = (id) => {
  return api.get(`/quiz/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
