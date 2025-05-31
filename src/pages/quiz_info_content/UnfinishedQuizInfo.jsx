// src/pages/tabs/components/UnfinishedQuizCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsClock, BsExclamationCircle } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import startVector from "../../assets/vector/vector_start_assessment.png";
import { useState } from "react";

const UnfinishedQuizInfo = ({ quiz }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const onStart = () => {
    setShowConfirm(true);
  };

  const confirmStart = () => {
    navigate(`/start-quiz/${quiz.id}`);
  };

  const cancelStart = () => {
    setShowConfirm(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[1450px] mx-auto">
      <div className="flex justify-center">
        <img
          src={startVector}
          alt="Quiz Preview"
          className="rounded-lg mb-4 w-140"
        />
      </div>

      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded mb-2"></span>
      <h2 className="text-xl font-semibold mb-1">{quiz.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

      <div className="flex items-center text-sm text-gray-700 mb-2">
        <BsClock className="mr-2" /> Duration: {quiz.duration || "15 minutes"}
      </div>
      <div className="flex items-center text-sm text-gray-700 mb-4">
        <FaRegListAlt className="mr-2" /> {quiz.totalQuestions || 25} questions
      </div>

      <div className="bg-yellow-50 text-yellow-800 text-sm rounded-md p-3 border border-yellow-200 mb-4">
        <BsExclamationCircle className="inline mr-2" />
        Once started, timer cannot be paused. <br /> All questions must be
        attempted.
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStart}
          className=" cursor-pointer bg-blue hover:bg-blue-600 text-white text-xl font-semibold py-6 px-14 rounded-lg"
        >
          Start Quiz
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Start Quiz?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to start the quiz now? The timer will begin
              immediately.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelStart}
                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmStart}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Yes, Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnfinishedQuizInfo;
