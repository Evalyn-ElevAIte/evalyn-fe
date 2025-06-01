import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getQuizWithQuestions } from "../../services/student_answer";

const PublishedQuizInfo = ({ quiz }) => {
  console.log("quiz: ", quiz);
  const [quizData, setQuizData] = useState([]);
  const quiz_id = quiz.id;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizWithQuestions(quiz_id);
        console.log("questions response: ", response);
        if (response.status === 200) {
          setQuizData(response.data);
          const existingEndTime = localStorage.getItem(
            `quiz_end_time_${quiz_id}`
          );
          if (!existingEndTime) {
            const endTime = new Date(
              new Date().getTime() + response.data.duration * 60000
            );
            localStorage.setItem(
              `quiz_end_time_${quiz_id}`,
              endTime.toISOString()
            );
            setRemainingTime(response.data.duration * 60);
          } else {
            const diff = Math.floor(
              (new Date(existingEndTime) - new Date()) / 1000
            );
            setRemainingTime(diff > 0 ? diff : 0);
          }
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
      }
    };
    fetchQuiz();
  }, [quiz_id]);

  console.log("quizData Questions: ", quizData);
  return <div>PublishedQuizInfo</div>;
};

export default PublishedQuizInfo;
