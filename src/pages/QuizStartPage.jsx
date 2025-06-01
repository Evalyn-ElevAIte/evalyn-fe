import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById } from "../services/quiz";
import {
  getQuizWithQuestions,
  submitAllAnswers,
} from "../services/student_answer";
import { analyzeQuiz } from "../services/ai";
import LoadingScreen from "../components/LoadingScreen";

const QuizStartPage = () => {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [remainingTime, setRemainingTime] = useState(() => {
    const savedEndTime = localStorage.getItem(`quiz_end_time_${quiz_id}`);
    if (savedEndTime) {
      const diff = Math.floor((new Date(savedEndTime) - new Date()) / 1000);
      return diff > 0 ? diff : 0;
    }
    return 0;
  });

  const token = localStorage.getItem("evalyn_token");

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const response = await getQuizWithQuestions(quiz_id);
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
        setIsLoading(false);
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
    setIsLoading(true);
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

    try {
      const submitRes = await submitAllAnswers(payload);

      if (submitRes.status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const analyzeRes = await analyzeQuiz(quizData.id, payload);

        if (analyzeRes.status === 200) {
          navigate("/success-submit", { state: { title: quizData.title } });
        } else {
          console.error("Analyze request failed:", analyzeRes);
        }
      } else {
        console.error("Submit request failed:", submitRes);
      }
    } catch (error) {
      console.error("Submit or analyze error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{quizData.title}</h1>
        <span className="text-red-600 font-semibold">
          Time Left: {formatTime(remainingTime)}
        </span>
      </div>
      <p className="text-gray-700 mb-6">{quizData.description}</p>

      {quizData.questions.map((question, index) => (
        <div
          key={question.id}
          className="bg-blue-50 border border-orange-200 rounded-2xl p-6 mb-6"
        >
          <p className="text-sm text-gray-500 mb-1 font-medium">
            Number {index + 1}
          </p>
          <h3 className="font-semibold mb-3 text-lg">{question.text}</h3>

          {question.type === "text" && (
            <textarea
              className="w-full border p-3 rounded text-sm"
              rows={4}
              placeholder="Type your answer here..."
              value={answers[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}

          {question.type === "single_choice" && (
            <div className="space-y-2">
              {question.options.map((opt, idx) => (
                <label key={idx} className="block text-sm">
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
                <label key={idx} className="block text-sm">
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
        className="bg-blue cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Submit Quiz
      </button>

      {/* <button
        onClick={() => {
          const payload = {
            quiz_id: quizData.id,
            title: quizData.title,
            description: quizData.description,
            responses: quizData.questions.map((q) => ({
              question_id: q.id,
              answer: {
                [q.type]:
                  answers[q.id] || (q.type === "multi_choice" ? [] : ""),
              },
            })),
          };

          console.log("payload: ", payload);
        }}
        className="bg-blue cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        CHECKKKKK GEMINX
      </button> */}
    </div>
  );
};

export default QuizStartPage;
