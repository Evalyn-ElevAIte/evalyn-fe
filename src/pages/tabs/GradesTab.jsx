// src/pages/tabs/GradesTab.jsx
import React, { useEffect, useState } from "react";
import { getAllStudentsAssessments } from "../../services/assessments";
import LoadingScreen from "../../components/LoadingScreen";
import { FaChevronLeft } from "react-icons/fa";

const GradesTab = ({ quizId, setActiveTab }) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getAllStudentsAssessments(quizId);
        if (response.status === 200) {
          const filtered = response.data.assessments.filter(
            (item) => item.status === "graded"
          );
          setGrades(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [quizId]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-4">
      <button
        onClick={() => setActiveTab("people")}
        className="mb-4 text-blue-600 flex items-center gap-1 text-sm hover:underline"
      >
        <FaChevronLeft className="text-xs" /> Back to People
      </button>

      <h2 className="text-xl font-semibold mb-4">Graded Submissions</h2>
      <div className="space-y-4">
        {grades.map((student) => (
          <div
            key={student.user_id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {student.student_name}
                </p>
                <p className="text-xs text-gray-500">
                  Score: {Math.round(student.score_percentage)} / 100
                </p>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                View Report
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              {student.summary_of_performance}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradesTab;
