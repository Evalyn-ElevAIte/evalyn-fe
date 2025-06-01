// src/pages/SuccessSubmit.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessSubmit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quizTitle = state?.title || "your quiz";

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8fbff] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-500 mb-2">
          Quiz Submitted
        </h2>
        <p className="text-gray-600 mb-4">
          You’ve successfully submitted{" "}
          <span className="font-semibold">{quizTitle}</span>.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Your submission has been received. Please wait while we process your
          answers. You can check back later for your results.
        </p>
        <button
          className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessSubmit;
