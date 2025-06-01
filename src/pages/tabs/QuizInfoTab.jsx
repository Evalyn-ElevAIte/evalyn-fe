import React from "react";
import UnfinishedQuizInfo from "../quiz_info_content/UnfinishedQuizInfo";
import SubmittedQuizInfo from "../quiz_info_content/SubmittedQuizInfo";
import PublishedQuizInfo from "../quiz_info_content/PublishedQuizInfo";
import GradedQuizInfo from "../quiz_info_content/GradedQuizInfo";

const QuizInfoTab = ({ status, quizData }) => {
  if (!quizData) {
    return <div>No quiz data available.</div>;
  }

  console.log("status: ", status);

  switch (status) {
    case "unfinished":
      return <UnfinishedQuizInfo quiz={quizData} />;
    case "submited":
      return <SubmittedQuizInfo quiz={quizData} />;
    case "graded":
      return <GradedQuizInfo quiz={quizData} />;
    case "published":
      return <PublishedQuizInfo quiz={quizData} quiz_id={quizData.id} />;

    case "done":
      return <PublishedQuizInfo quiz={quizData} quiz_id={quizData.id} />;

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
