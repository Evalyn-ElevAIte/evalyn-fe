import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserQuizzes, getUserQuizzesCreator } from "../services/user";
import LoadingScreen from "../components/LoadingScreen";

const STATUS_STYLE = {
  Published: "bg-blue-100 text-blue-600",
  Done: "bg-green-100 text-green-600",
  Unfinished: "bg-red-100 text-red-600",
  Submitted: "bg-yellow-100 text-yellow-600",
  Graded: "bg-green-100 text-green-600",
};

const MyQuizzes = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [currentPageMyQuizzes, setCurrentPageMyQuizzes] = useState(1);
  const [currentPageEnrolled, setCurrentPageEnrolled] = useState(1);
  const quizzesPerPage = 3;

  const [myQuizzes, setMyQuizzes] = useState([]);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);

  const viewQuizHandle = (quiz_id) => {
    navigate(`/quiz-info/${quiz_id}`);
  };

  const fetchMyQuizzes = async () => {
    try {
      const myQuizzesResponse = await getUserQuizzes();
      if (myQuizzesResponse.status === 200) {
        const data = myQuizzesResponse.data;
        if (Array.isArray(data)) {
          setEnrolledQuizzes(data);
        } else {
          setEnrolledQuizzes([]);
          console.warn("No my quizzes found:", data.detail);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchMyQuizzesCreator = async () => {
    try {
      const myQuizzesCreatorResponse = await getUserQuizzesCreator();
      if (myQuizzesCreatorResponse.status === 200) {
        const data = myQuizzesCreatorResponse.data;
        if (Array.isArray(data)) {
          setMyQuizzes(data);
        } else {
          setMyQuizzes([]);
          console.warn("No enrolled quizzes found:", data.detail);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    const loadQuizzes = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchMyQuizzes(), fetchMyQuizzesCreator()]);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizzes();
  }, []);
  const totalPagesMyQuizzes = Math.ceil(myQuizzes.length / quizzesPerPage);
  const totalPagesEnrolled = Math.ceil(enrolledQuizzes.length / quizzesPerPage);

  useEffect(() => {
    if (currentPageMyQuizzes > totalPagesMyQuizzes && totalPagesMyQuizzes > 0) {
      setCurrentPageMyQuizzes(1);
    }
  }, [myQuizzes]);

  useEffect(() => {
    if (currentPageEnrolled > totalPagesEnrolled && totalPagesEnrolled > 0) {
      setCurrentPageEnrolled(1);
    }
  }, [enrolledQuizzes]);

  const paginate = (quizzes, currentPage) => {
    const indexOfLast = currentPage * quizzesPerPage;
    const indexOfFirst = indexOfLast - quizzesPerPage;
    return quizzes.slice(indexOfFirst, indexOfLast);
  };

  const createQuizHandle = () => {
    navigate(`/create`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="">
      <div className="bg-blue-50 px-6 py-12 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 pt-8">
          My Quizzes
        </h2>
        <p className="text-sm text-gray-600">
          Manage your quizzes and view student submissions.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search quizzes..."
          className="w-full max-w-md border my-6 border-gray-300 rounded-lg px-4 py-2 text-sm mb-6"
        />
        <button
          onClick={createQuizHandle}
          className="bg-blue hover:bg-blue-600 text-white px-6 py-3 h-14 rounded-xl font-medium cursor-pointer"
        >
          + Create Quiz
        </button>
      </div>

      <h2 className="text-base font-semibold text-gray-700 mb-2">My Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {paginate(myQuizzes, currentPageMyQuizzes).length > 0 ? (
          paginate(myQuizzes, currentPageMyQuizzes).map((quiz, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-3xl p-8 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-gray-800">
                  {quiz.title}
                </h3>
                {quiz.status && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      STATUS_STYLE[quiz.status]
                    }`}
                  >
                    {quiz.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Created: {quiz.created}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {quiz.submissions} submissions
              </p>
              <button
                onClick={() => viewQuizHandle(quiz.id)}
                className="bg-blue text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
              >
                View Quiz
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No quizzes found.
          </p>
        )}
      </div>

      {totalPagesMyQuizzes > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={() =>
              setCurrentPageMyQuizzes((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPageMyQuizzes === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 cursor-pointer"
          >
            &lt;
          </button>
          {[...Array(totalPagesMyQuizzes)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPageMyQuizzes(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPageMyQuizzes === i + 1
                  ? "bg-blue text-white border-blue"
                  : "border-gray-300 text-gray-700 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPageMyQuizzes((prev) =>
                Math.min(prev + 1, totalPagesMyQuizzes)
              )
            }
            disabled={currentPageMyQuizzes === totalPagesMyQuizzes}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 cursor-pointer"
          >
            &gt;
          </button>
        </div>
      )}

      <h2 className="text-base font-semibold text-gray-700 mb-2">Enrolled</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {paginate(enrolledQuizzes, currentPageEnrolled).length > 0 ? (
          paginate(enrolledQuizzes, currentPageEnrolled).map((quiz, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-3xl p-8 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-gray-800">
                  {quiz.title}
                </h3>
                {quiz.status && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      STATUS_STYLE[quiz.status]
                    }`}
                  >
                    {quiz.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Created: {quiz.created}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {quiz.submissions} submissions
              </p>
              <button
                onClick={() => viewQuizHandle(quiz.id)}
                className="bg-blue text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
              >
                View Quiz
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No enrolled quizzes found.
          </p>
        )}
      </div>

      {totalPagesEnrolled > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() =>
              setCurrentPageEnrolled((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPageEnrolled === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 cursor-pointer"
          >
            &lt;
          </button>
          {[...Array(totalPagesEnrolled)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPageEnrolled(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPageEnrolled === i + 1
                  ? "bg-blue text-white border-blue"
                  : "border-gray-300 text-gray-700 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPageEnrolled((prev) =>
                Math.min(prev + 1, totalPagesEnrolled)
              )
            }
            disabled={currentPageEnrolled === totalPagesEnrolled}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 cursor-pointer"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MyQuizzes;
