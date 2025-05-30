import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuccessJoin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8fbff] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-500 mb-2">
          Successfully Joined!
        </h2>
        <p className="text-gray-600 mb-6">
          You have successfully joined the quiz.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/quizzes")}
        >
          View Your Quiz
        </button>
      </div>
    </div>
  );
};

export default SuccessJoin;
