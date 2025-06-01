import React, { useEffect, useState } from "react";
import {
  getAllStudentsAssessments,
  getAssessmentById,
} from "../../services/assessments";
import LoadingScreen from "../../components/LoadingScreen";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GradesTab = ({ quizId, setActiveTab }) => {
  const [grades, setGrades] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getAllStudentsAssessments(quizId);
        if (response.status === 200) {
          const filtered = response.data.assessments.filter(
            (item) => item.status === "graded"
          );
          setGrades(filtered);
          if (filtered.length > 0) {
            setSelectedId(filtered[0].assessment_id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchGrades();
  }, [quizId]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!selectedId) return;
      try {
        // setLoading(true);
        const res = await getAssessmentById(selectedId);
        if (res.status === 200) setSelectedDetail(res.data);
      } catch (e) {
        console.error("Error loading detail:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [selectedId]);

  // if (loading || !selectedDetail) return <LoadingScreen />;

  if (!selectedDetail) {
    return <LoadingScreen />;
  }
  console.log("selectedDetail: ", selectedDetail);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setActiveTab("people")}
          className="text-blue-600 flex items-center gap-1 text-sm hover:underline"
        >
          <FaChevronLeft className="text-xs" /> Back to People
        </button>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(parseInt(e.target.value))}
          className="border border-gray-300 px-3 py-1 rounded text-sm"
        >
          {grades.map((s) => (
            <option key={s.assessment_id} value={s.assessment_id}>
              {s.student_name}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold mb-4">AI Analysis Result</h2>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800">
              Student: {selectedDetail.student_name}
            </p>
            <p className="text-sm text-gray-500">
              Submitted:{" "}
              {new Date(
                selectedDetail.submission_timestamp_utc
              ).toLocaleString()}
            </p>
          </div>
          <div className="text-blue-600 text-3xl font-bold">
            {Math.round(selectedDetail.score_percentage)} / 100
          </div>
        </div>
      </div>

      {selectedDetail.question_assessments.map((q, idx) => (
        <div
          key={q.id}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold text-sm mb-1">
            Question {idx + 1}: {q.question_text}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {q.student_answer_text || <em>No answer provided.</em>}
          </p>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded text-sm">
            <p className="font-semibold mb-2">Missing Concepts:</p>
            <ul className="list-disc list-inside text-red-500">
              {q.missing_concepts.map((m) => (
                <li key={m.id}>{m.missing_concept}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-xs italic text-gray-600">
                {q.overall_question_feedback}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-2">Final Feedback Summary</h3>
        <p className="text-sm text-gray-700 mb-1">
          {selectedDetail.summary_of_performance}
        </p>
        <p className="text-sm text-green-700 mt-2">
          {selectedDetail.general_positive_feedback}
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          {selectedDetail.general_areas_for_improvement}
        </p>
      </div>
    </div>
  );
};

export default GradesTab;
