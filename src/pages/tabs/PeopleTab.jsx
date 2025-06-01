import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { formatDistanceToNow } from "date-fns";
import { FaChevronRight } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { getAssessmentById } from "../../services/assessments";
import { useNavigate } from "react-router-dom";

const getStatusLabel = (status) => {
  switch (status) {
    case "unfinished":
      return (
        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
          Pending
        </span>
      );
    case "submited":
      return (
        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
          Analyze by AI
        </span>
      );
    case "graded":
      return (
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
          Completed
        </span>
      );
    default:
      return <span className="text-xs text-gray-400">Unknown</span>;
  }
};

const PeopleTab = ({ quizId, status, people, quizName }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = async (person) => {
    try {
      setLoading(true);
      const res = await getAssessmentById(person.assessment_id);
      if (res.status === 200) {
        navigate("/quiz/assessment-result", {
          state: {
            result: res.data,
            studentName: person.student_name,
            quizName: quizName,
          },
        });
      }
    } catch (e) {
      console.error("Failed to load assessment detail", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  if (status === "published" || status === "done") {
    return (
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 text-sm font-semibold text-gray-600">
                Student Name
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Submission Time
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                AI Score
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.user_id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      person.student_name
                    )}`}
                    alt={person.student_name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-sm text-gray-800">
                    {person.student_name}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {person.submission_timestamp_utc
                    ? formatDistanceToNow(
                        new Date(person.submission_timestamp_utc),
                        { addSuffix: true }
                      )
                    : "—"}
                </td>
                <td className="p-4 text-sm text-blue-700 font-semibold">
                  {person.status === "graded" || person.status === "submited"
                    ? `${Math.round(person.score_percentage)} / 100`
                    : "—"}
                </td>
                <td className="p-4">{getStatusLabel(person.status)}</td>
                <td className="p-4">
                  {person.status === "graded" && (
                    <button
                      onClick={() => handleViewDetails(person)}
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      View Details <FaChevronRight className="text-xs mt-0.5" />
                    </button>
                  )}
                  {person.status === "submited" && (
                    <div>
                      <button
                        onClick={() => handleViewDetails(person)}
                        className="inline-flex items-center gap-2 cursor-pointer bg-orange text-yellow-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-yellow-200 transition"
                      >
                        <BsPencilSquare className="text-white" />
                        Give Grades
                      </button>
                      <div className="text-xs text-red-500 mt-1">
                        ⚠ Please grade this participant.
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {people.map((person) => (
        <div
          key={person.user_id}
          className="border rounded-lg p-4 shadow-sm flex gap-4"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              person.student_name
            )}`}
            alt={person.student_name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium text-sm text-gray-800">
              {person.student_name}
            </div>
            <div className="text-xs text-gray-500">
              {person.submission_timestamp_utc
                ? formatDistanceToNow(
                    new Date(person.submission_timestamp_utc),
                    { addSuffix: true }
                  )
                : "Haven't submitted yet"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleTab;
