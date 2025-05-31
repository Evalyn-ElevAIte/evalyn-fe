import api from "./api";
const token = localStorage.getItem("evalyn_token");

export const getUser = () => {
  return api.get("/user/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllUserQuizzes = () => {
  return api.get(`/user/quizzes/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserQuizzes = () => {
  return api.get(`/user/quizzes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserQuizzesCreator = () => {
  return api.get(`user/quizzes_creator`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
