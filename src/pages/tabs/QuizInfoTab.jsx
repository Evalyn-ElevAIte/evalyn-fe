import React from "react";
import UnfinishedQuizInfo from "../quiz_info_content/UnfinishedQuizInfo";

const QuizInfoTab = ({ status, quizData }) => {
  if (!quizData) {
    return <div>No quiz data available.</div>;
  }

  switch (status) {
    case "unfinished":
      return <UnfinishedQuizInfo quiz={quizData} />;
    case "submitted":
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
          <p className="text-gray-700 mb-4">{quizData.description}</p>
          <p className="text-yellow-600">
            You submitted this quiz. Await grading.
          </p>
        </div>
      );
    case "graded":
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
          <p className="text-gray-700 mb-4">{quizData.description}</p>
          <p className="text-green-600">Your quiz has been graded.</p>
          {/* Optionally show score: */}
          {/* <p className="font-semibold">Score: {quizData.score}</p> */}
        </div>
      );
    case "published":
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
          <p className="text-gray-700 mb-4">{quizData.description}</p>
          <p className="text-blue-600">This quiz is live for students.</p>
        </div>
      );
    case "done":
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
          <p className="text-gray-700 mb-4">{quizData.description}</p>
          <p className="text-green-700">
            All students have completed this quiz.
          </p>
        </div>
      );
    default:
      return (
        <div>
          <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
          <p className="text-gray-700 mb-4">{quizData.description}</p>
          <p className="text-gray-500">Unknown status.</p>
        </div>
      );
  }
};

export default QuizInfoTab;
