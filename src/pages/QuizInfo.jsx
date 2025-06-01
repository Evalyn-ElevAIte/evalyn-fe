import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizInfoTab from "./tabs/QuizInfoTab";
import PeopleTab from "./tabs/PeopleTab";
import GradesTab from "./tabs/GradesTab";
import { getQuizById } from "../services/quiz";
import LoadingScreen from "../components/LoadingScreen";
import { getAllStudentsAssessments } from "../services/assessments";

const QuizInfo = () => {
  const { quiz_id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [people, setPeople] = useState([]);

  const [activeTab, setActiveTab] = useState("info");
  const [availableTabs, setAvailableTabs] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);

  const fetchPeople = async () => {
    try {
      const peopleResponse = await getAllStudentsAssessments(quiz_id);
      if (peopleResponse.status === 200) {
        setPeople(peopleResponse.data.assessments);
        console.log("peopleResponse.data: ", peopleResponse.data.assessments);
      }
    } catch (error) {
      console.error("Failed to load people list:", error);
    } finally {
      // setLoading(false);
    }
  };

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
  useEffect(() => {
    fetchQuiz();
    fetchPeople();
  }, [quiz_id]);

  useEffect(() => {
    if (!quizData) return;

    if (!quizData.status && quizData.completed !== null) {
      // Teacher
      setAvailableTabs(["info", "people"]);//grades is saved first
    } else if (quizData.status === "unfinished") {
      setAvailableTabs(["info", "people"]);
    } else if (quizData.status === "submited") {
      setAvailableTabs(["info", "people"]);
    } else if (quizData.status === "graded") {
      setAvailableTabs(["info", "people", "grades"]); //grades is saved first
    } else {
      setAvailableTabs(["info"]);
    }
  }, [quizData]);

  const getStatus = () => {
    if (!quizData) return "";
    return (
      quizData.status || (quizData.completed === true ? "done" : "published")
    );
  };

  const renderTab = () => {
    if (!quizData) return <LoadingScreen />;
    const status = getStatus();
    switch (activeTab) {
      case "info":
        return <QuizInfoTab quizData={quizData} status={status} />;
      case "people":
        return (
          <PeopleTab
            quizId={quizData.id}
            status={status}
            people={people}
            quizName={quizData.title}
          />
        );
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

  // if (isLoading || !quizData) {
  //   return <LoadingScreen />;
  // }

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
