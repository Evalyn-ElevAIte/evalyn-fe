import React from "react";
import { FaCheckCircle, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuccessCreate = ({
  quizCode = "XJ82KD",
  quizTitle = "Introduction to Mathematics",
  createdAt = new Date(),
  questionCount = 10,
}) => {
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(quizCode);
    alert("Quiz code copied!");
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(date));

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

        <h3 className="text-lg font-semibold text-gray-800">{quizTitle}</h3>
        <p className="text-sm text-gray-500">
          Created on {formatDate(createdAt)}
        </p>
        <p className="text-sm text-gray-500 mb-6">{questionCount} Questions</p>

        <div className="bg-blue-50 rounded-xl py-4 px-6 mb-6">
          <p className="text-sm text-gray-500 mb-1">Your Quiz Code</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-semibold text-blue-600">
              {quizCode}
            </span>
            <button
              onClick={handleCopy}
              className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Share this code with your students to join the quiz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center gap-2">
            <FaLink />
            Copy Invite Link
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/quiz-details")}
          >
            View Quiz Details
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => navigate("/create")}
          >
            Create Another Quiz
          </button>
        </div>

        <img
          src="https://source.unsplash.com/400x200/?education,quiz"
          alt="Quiz illustration"
          className="rounded-xl mx-auto shadow-sm"
        />
      </div>
    </div>
  );
};

export default SuccessCreate;
