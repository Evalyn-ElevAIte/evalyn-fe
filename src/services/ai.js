import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const analyzeQuiz = (quiz_id) => {
  return api.post(`/api/ai/analyze-quiz/${quiz_id}?model_name=azure`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
