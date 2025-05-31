import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const getQuizWithQuestions = (quiz_id) => {
  return api.get(`/student/answers/quiz/${quiz_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const submitAllAnswers = (payload) => {
  return api.post(`/student/answers/`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
