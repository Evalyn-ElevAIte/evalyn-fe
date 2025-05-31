import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizInfoTab from "./tabs/QuizInfoTab";
import PeopleTab from "./tabs/PeopleTab";
import GradesTab from "./tabs/GradesTab";
import { getQuizById } from "../services/quiz";
import LoadingScreen from "../components/LoadingScreen";

const QuizInfo = () => {
  const { quiz_id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [availableTabs, setAvailableTabs] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(quiz_id);
        if (response.status === 200) {
          setQuizData(response.data);
          console.log("quizData: ", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };

    fetchQuiz();
  }, [quiz_id]);

  useEffect(() => {
    if (!quizData) return;

    if (!quizData.status && quizData.completed !== null) {
      // Teacher
      setAvailableTabs(["info", "people", "grades"]);
    } else if (quizData.status === "unfinished") {
      setAvailableTabs(["info", "people"]);
    } else if (quizData.status === "submitted") {
      setAvailableTabs(["info", "people"]);
    } else if (quizData.status === "graded") {
      setAvailableTabs(["info", "people", "grades"]);
    } else {
      setAvailableTabs(["info"]);
    }
  }, [quizData]);

  const getStatus = () => {
    return (
      quizData.status || (quizData.completed === true ? "done" : "published")
    );
  };

  const renderTab = () => {
    const status = getStatus();
    switch (activeTab) {
      case "info":
        return <QuizInfoTab quizData={quizData} status={status} />;
      case "people":
        return <PeopleTab quizId={quizData.id} status={status} />;
      case "grades":
        return <GradesTab quizId={quizData.id} />;
      default:
        return null;
    }
  };

  const tabLabel = {
    info: "Quiz Info",
    people: "People",
    grades: "Grades",
  };

  if (!quizData) {
    return <LoadingScreen />;
  }

  return (
    <div className="quiz-info pt-12">
      <div className="flex border-b border-gray-200">
        {availableTabs.map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`px-4 py-2 text-lg font-semibold border-b-3 transition-colors duration-200 ${
              activeTab === tabKey
                ? "border-blue text-blue-600"
                : "border-transparent text-gray-300 hover:text-blue-600 cursor-pointer"
            }`}
          >
            {tabLabel[tabKey]}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white shadow rounded-b-lg">{renderTab()}</div>
    </div>
  );
};

export default QuizInfo;
