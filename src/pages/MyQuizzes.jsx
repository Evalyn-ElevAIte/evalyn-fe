import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserQuizzes, getUserQuizzesCreator } from "../services/user";
import LoadingScreen from "../components/LoadingScreen";

const dummyQuizzes = [
  {
    title: "Advanced Mathematics Quiz",
    created: "Jan 14, 2024",
    submissions: 32,
    status: "Published",
    type: "mine",
  },
  {
    title: "Physics Midterm Test",
    created: "Jan 10, 2024",
    submissions: 41,
    status: "Done",
    type: "mine",
  },
  {
    title: "Introduction to Biology",
    created: "Jan 15, 2024",
    submissions: 45,
    status: "Unfinished",
    type: "enrolled",
  },
  {
    title: "Advanced Mathematics Quiz",
    created: "Jan 14, 2024",
    submissions: 32,
    status: "Submitted",
    type: "enrolled",
  },
  {
    title: "World History Assessment",
    created: "Jan 13, 2024",
    submissions: 28,
    status: "Graded",
    type: "enrolled",
  },
];

const STATUS_STYLE = {
  Published: "bg-blue-100 text-blue-600",
  Done: "bg-green-100 text-green-600",
  Unfinished: "bg-red-100 text-red-600",
  Submitted: "bg-yellow-100 text-yellow-600",
  Graded: "bg-green-100 text-green-600",
};

const MyQuizzes = () => {
  const navigate = useNavigate();

  const [currentPageMyQuizzes, setCurrentPageMyQuizzes] = useState(1);
  const [currentPageEnrolled, setCurrentPageEnrolled] = useState(1);
  const quizzesPerPage = 3;

  const [myQuizzes, setMyQuizzes] = useState([]);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);

  const viewQuizHandle = (quiz_id) => {
    navigate(`/quiz-info/${quiz_id}`);
  };

  // const myQuizzes = dummyQuizzes.filter((quiz) => quiz.type === "mine");
  // const enrolledQuizzes = dummyQuizzes.filter(
  //   (quiz) => quiz.type === "enrolled"
  // );

  const fetchMyQuizzes = async () => {
    try {
      const myQuizzesResponse = await getUserQuizzes();
      // console.log("myQuizzesResponse: ", myQuizzesResponse);
      if (myQuizzesResponse.status == 200) {
        setEnrolledQuizzes(myQuizzesResponse.data);
        console.log("myQuizzesResponse.data: ", myQuizzesResponse.data);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const fetchMyQuizzesCreator = async () => {
    try {
      const myQuizzesCreatorResponse = await getUserQuizzesCreator();
      // console.log("myQuizzesResponse: ", myQuizzesResponse);
      if (myQuizzesCreatorResponse.status == 200) {
        setMyQuizzes(myQuizzesCreatorResponse.data);
        console.log(
          "myQuizzesCreatorResponse.data: ",
          myQuizzesCreatorResponse.data
        );
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchMyQuizzes();
    fetchMyQuizzesCreator();
  }, []);

  const paginate = (quizzes, currentPage) => {
    const indexOfLast = currentPage * quizzesPerPage;
    const indexOfFirst = indexOfLast - quizzesPerPage;
    return quizzes.slice(indexOfFirst, indexOfLast);
  };

  const totalPagesMyQuizzes = Math.ceil(myQuizzes.length / quizzesPerPage);
  const totalPagesEnrolled = Math.ceil(enrolledQuizzes.length / quizzesPerPage);

  const createQuizHandle = () => {
    navigate(`/create`);
  };

  if (myQuizzes.length === 0 && enrolledQuizzes.length === 0) {
    return <LoadingScreen />;
  }

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
        {paginate(myQuizzes, currentPageMyQuizzes).map((quiz, index) => (
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
              onClick={() => {
                viewQuizHandle(quiz.id);
              }}
              className="bg-blue text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              View Quiz
            </button>
          </div>
        ))}
      </div>
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
                : "border-gray-300 text-gray-700 hover:bg-gray-300 cursor-pointer "
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

      <h2 className="text-base font-semibold text-gray-700 mb-2">Enrolled</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {paginate(enrolledQuizzes, currentPageEnrolled).map((quiz, index) => (
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
              onClick={() => {
                viewQuizHandle(quiz.id);
              }}
              className="bg-blue text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              View Quiz
            </button>
          </div>
        ))}
      </div>
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
            className={`px-3 py-1 border rounded  ${
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
    </div>
  );
};

export default MyQuizzes;
