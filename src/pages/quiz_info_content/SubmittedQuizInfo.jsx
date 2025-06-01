// src/pages/tabs/components/SubmittedQuizInfo.jsx
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import waitedVector from "../../assets/vector/vector_submitted_quiz.png";

const SubmittedQuizInfo = ({ quiz }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[1450px] mx-auto">
      <div className="flex justify-center">
        <img
          src={waitedVector}
          alt="Waiting for Result"
          className="rounded-lg mb-4 w-140"
        />
      </div>

      <h2 className="text-xl font-semibold mb-1 text-center">
        {quiz.title || "Quiz Submitted"}
      </h2>

      <p className="text-gray-600 text-sm mb-4 text-center">
        You have successfully submitted this quiz.
      </p>

      <div className="flex items-center justify-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3 mb-4">
        <BsCheckCircle className="mr-2" />
        Please wait while your results are being processed.
      </div>

      <div className="text-center text-gray-500 text-sm">
        Come back later to check your score, or wait for your instructor to
        publish the result.
      </div>
    </div>
  );
};

export default SubmittedQuizInfo;
