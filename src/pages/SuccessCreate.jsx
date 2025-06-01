import React from "react";
import { useEffect } from "react";
import { FaCheckCircle, FaLink } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../services/quiz";
import { useState } from "react";
import { formatDateToWIB } from "../utils/formateDate";

const SuccessCreate = ({
  quizCode = "XJ82KD",
  quizTitle = "Introduction to Mathematics",
  createdAt = new Date(),
  questionCount = 10,
}) => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState([]);

  const fetchQuizData = async () => {
    try {
      const quizResponse = await getQuizById(quiz_id);
      //   console.log("quizResponse: ", quizResponse);
      if (quizResponse.status == 200) {
        setQuiz(quizResponse.data);
        console.log("quizResponse.data: ", quizResponse.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(quiz.join_code);
    alert("Quiz code copied!");
  };

  return (
    <div className="min-h-0 flex justify-center bg-[#f8fbff] px-4 py-36">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl w-full text-center ">
        <FaCheckCircle className="text-blue-400 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-blue-500 mb-2">
          Quiz Successfully Created!
        </h2>
        <p className="text-gray-600 mb-4">
          Your quiz is now live and ready to share.
        </p>

        <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
        <p className="text-sm text-gray-500">
          {quiz.created_at
            ? `Created on ${formatDateToWIB(quiz.created_at)}`
            : ""}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {`Durations: ${quiz.duration} minutes`}
        </p>

        <div className="bg-blue-50 rounded-xl py-4 px-6 mb-6">
          <p className="text-sm text-gray-500 mb-1">Your Quiz Code</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-semibold text-blue-600">
              {quiz.join_code}
            </span>
            <button
              onClick={handleCopy}
              className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300 cursor-pointer"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Share this code with your students to join the quiz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {/* <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center gap-2">
            <FaLink />
            Copy Invite Link
          </button> */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => navigate(`/quiz-info/${quiz_id}`)}
          >
            View Quiz Details
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"
            onClick={() => navigate("/create")}
          >
            Create Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessCreate;
