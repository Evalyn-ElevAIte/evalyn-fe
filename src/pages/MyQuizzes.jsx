import React, { useState } from "react";

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
  const [currentPageMyQuizzes, setCurrentPageMyQuizzes] = useState(1);
  const [currentPageEnrolled, setCurrentPageEnrolled] = useState(1);
  const quizzesPerPage = 3;

  const myQuizzes = dummyQuizzes.filter((quiz) => quiz.type === "mine");
  const enrolledQuizzes = dummyQuizzes.filter(
    (quiz) => quiz.type === "enrolled"
  );

  const paginate = (quizzes, currentPage) => {
    const indexOfLast = currentPage * quizzesPerPage;
    const indexOfFirst = indexOfLast - quizzesPerPage;
    return quizzes.slice(indexOfFirst, indexOfLast);
  };

  const totalPagesMyQuizzes = Math.ceil(myQuizzes.length / quizzesPerPage);
  const totalPagesEnrolled = Math.ceil(enrolledQuizzes.length / quizzesPerPage);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">My Quizzes</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage your quizzes and view student submissions.
      </p>

      <input
        type="text"
        placeholder="Search quizzes..."
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-sm mb-6"
      />

      <h2 className="text-base font-semibold text-gray-700 mb-2">My Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {paginate(myQuizzes, currentPageMyQuizzes).map((quiz, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
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
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
              View Submissions
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
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {[...Array(totalPagesMyQuizzes)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPageMyQuizzes(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPageMyQuizzes === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700"
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
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      <h2 className="text-base font-semibold text-gray-700 mb-2">Enrolled</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {paginate(enrolledQuizzes, currentPageEnrolled).map((quiz, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
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
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
              View Submissions
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
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {[...Array(totalPagesEnrolled)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPageEnrolled(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPageEnrolled === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700"
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
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MyQuizzes;
