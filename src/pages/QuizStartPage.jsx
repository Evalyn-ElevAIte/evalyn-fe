// src/pages/QuizStartPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById } from "../services/quiz";
import {
  getQuizWithQuestions,
  submitAllAnswers,
} from "../services/student_answer";
import { analyzeQuiz } from "../services/ai";

const QuizStartPage = () => {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizWithQuestions(quiz_id);
        if (response.status === 200) {
          setQuizData(response.data);
          setRemainingTime(response.data.duration * 60);
          console.log("response.data ", response.data);
          console.log("response.data.duration: ", response.data.duration);
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };
    fetchQuiz();
  }, [quiz_id]);

  useEffect(() => {
    if (!remainingTime) return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      quiz_id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      responses: quizData.questions.map((q) => ({
        question_id: q.id,
        answer: {
          [q.type]: answers[q.id] || (q.type === "multi_choice" ? [] : ""),
        },
      })),
    };

    console.log("payload: ", payload);
    try {
      const res = await Promise.all([
        submitAllAnswers(payload),
        // analyzeQuiz(quizData.id, payload),
      ]);
      console.log("res: ", res);
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{quizData.title}</h1>
        <span className="text-red-600 font-semibold">
          Time Left: {formatTime(remainingTime)}
        </span>
      </div>
      <p className="text-gray-700 mb-6">{quizData.description}</p>

      {quizData.questions.map((question) => (
        <div key={question.id} className="mb-6">
          <h3 className="font-semibold mb-2">{question.text}</h3>
          {question.type === "text" && (
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={answers[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}
          {question.type === "single_choice" && (
            <div className="space-y-2">
              {question.options.map((opt, idx) => (
                <label key={idx} className="block">
                  <input
                    type="radio"
                    name={`single_${question.id}`}
                    value={opt}
                    checked={answers[question.id] === opt}
                    onChange={() => handleChange(question.id, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
          {question.type === "multi_choice" && (
            <div className="space-y-2">
              {question.options.map((opt, idx) => (
                <label key={idx} className="block">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={answers[question.id]?.includes(opt)}
                    onChange={(e) => {
                      const newVals = answers[question.id] || [];
                      if (e.target.checked) {
                        handleChange(question.id, [...newVals, opt]);
                      } else {
                        handleChange(
                          question.id,
                          newVals.filter((v) => v !== opt)
                        );
                      }
                    }}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizStartPage;
