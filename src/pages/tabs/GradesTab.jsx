import React, { useEffect, useState } from "react";
import {
  getAllStudentsAssessments,
  getAssessmentById,
} from "../../services/assessments";
import LoadingScreen from "../../components/LoadingScreen";
import { FaChevronLeft } from "react-icons/fa";
import { getUser } from "../../services/user";

const GradesTab = ({ quizId, setActiveTab }) => {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserResult = async () => {
      try {
        const nameResponse = await getUser();
        if (nameResponse.status === 200) {
          const currentUserName = nameResponse.data.name;
          console.log("currentUserName: ", currentUserName);
          setUserName(currentUserName);

          const gradesResponse = await getAllStudentsAssessments(quizId);
          if (gradesResponse.status === 200) {
            console.log(
              "gradesResponse.data.assessments: ",
              gradesResponse.data.assessments
            );

            const filtered = gradesResponse.data.assessments.filter(
              (item) =>
                item.status === "graded" &&
                item.student_name === currentUserName
            );

            if (filtered.length > 0) {
              const assessmentId = filtered[0].assessment_id;
              console.log("assessmentId: ", assessmentId);
              const detailResponse = await getAssessmentById(assessmentId);
              if (detailResponse.status === 200) {
                setSelectedDetail(detailResponse.data);
                console.log("detailResponse.data: ", detailResponse.data);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch user grade detail:", error);
      }
    };

    fetchUserResult();
  }, [quizId]);

  if (!selectedDetail) return <LoadingScreen />;
  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  const overallPercentage = Math.round(
    (selectedDetail.overall_score / selectedDetail.overall_max_score) * 100
  );
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Final Evaluation by Quiz Creator
      </h2>

      {/* Summary Box */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-800 font-semibold">
            Student: {userName}
          </p>
          <p className="text-sm text-gray-500">
            Submitted:{" "}
            {new Date(selectedDetail.submission_timestamp_utc).toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-blue-600 text-4xl font-bold">
            {overallPercentage}/100
          </p>
          <div className="w-40 mt-2 h-2 bg-blue-100 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${selectedDetail.overallPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex flex-col items-end gap-1 text-sm">
            <span className="text-green-600 font-medium">
              AI Evaluation Status: Completed
            </span>
            <span className="bg-blue-50 text-blue-500 px-3 py-1 text-xs rounded-full w-fit">
              AI Insights Enabled
            </span>
          </div>
        </div>
      </div>

      {selectedDetail.question_assessments.map((q, idx) => (
        <div
          key={q.id}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold text-sm mb-2">
            Question {idx + 1}: {q.question_text}
          </h3>
          {console.log("q.student_answer_text: ", q.student_answer_text)}
          <div className="bg-gray-50 border rounded p-3 text-sm mb-3">
            {q.student_answer_text ? (
              <p>{q.student_answer_text}</p>
            ) : (
              <em className="text-gray-400">No answer provided.</em>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded text-sm">
            <div className="mb-2">
              <p className="font-semibold mb-1">Key Points Covered:</p>
              <ul className="list-disc list-inside text-green-500">
                {q.key_points.map((m) => (
                  <li key={m.id}>{m.key_point}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-1">Missing Concepts:</p>
              <ul className="list-disc list-inside text-red-500">
                {q.missing_concepts.map((m) => (
                  <li key={m.id}>{m.missing_concept}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                <span>Relevance to Question</span>
                <span>
                  {q.score}/{q.max_score_possible}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className={`h-2.5 rounded-full ${getScoreColor(
                    (q.score / q.max_score_possible) * 100
                  )}`}
                  style={{
                    width: `${(q.score / q.max_score_possible) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="mt-2">
                <span className="text-lg font-bold text-blue  ml-2">
                  {q.score}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  / {q.max_score_possible}
                </span>
              </div>

              {/* <p className="mt-2 text-sm text-gray-700">
                Answer Quality:{" "}
                <span className="font-semibold text-green-700">Good</span>
              </p> */}
            </div>
          </div>

          <p className="text-xs italic text-gray-500 mt-3">
            "{q.overall_question_feedback}"
          </p>
        </div>
      ))}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          Final Feedback Summary
        </h3>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <p className="text-sm text-red-700">
            {selectedDetail.summary_of_performance}
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
          <p className="text-sm text-green-800">
            {selectedDetail.general_positive_feedback}
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <p className="text-sm text-yellow-800">
            {selectedDetail.general_areas_for_improvement}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradesTab;
