import React from "react";
import finishVector from "../../assets/vector/vector_graded_info.png";
import { BsCheckCircle } from "react-icons/bs";

const GradedQuizInfo = ({ quiz }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[1450px] mx-auto">
      <div className="flex justify-center">
        <img
          src={finishVector}
          alt="Waiting for Result"
          className="rounded-lg mb-4 w-140"
        />
      </div>

      <h2 className="text-xl font-semibold mb-1 text-center">
        {quiz.title || "Quiz Submitted"}
      </h2>
      <div className="text-center text-gray-500 text-sm mb-3">
        Your assessment already graded by the quiz creator
      </div>

      <div className="flex items-center justify-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3 mb-4">
        <BsCheckCircle className="mr-2" />
        Please check the "Grades" tab
      </div>
    </div>
  );
};

export default GradedQuizInfo;
