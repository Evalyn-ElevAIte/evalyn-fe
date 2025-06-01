import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const getAllStudentsAssessments = (quiz_id) => {
  return api.get(`/assesment/quiz/${quiz_id}/all-students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAssessmentById = (assesment_id) => {
  return api.get(`/assesment/${assesment_id}`);
};

export const updateAssessmentGrading = (assesment_id, payload) => {
  return api.patch(`/assesment/${assesment_id}/grade`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getQuizStatistics = (quiz_id) => {
  return api.get(`/assesment/quiz/${quiz_id}/statistics`);
};
