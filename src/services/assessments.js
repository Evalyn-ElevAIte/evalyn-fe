import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const getAllStudentsAssessments = (quiz_id) => {
  return api.get(`/assesment/quiz/${quiz_id}/all-students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};