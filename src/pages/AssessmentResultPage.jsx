import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import { updateAssessmentGrading } from "../services/assessments";
import { Bot } from "lucide-react";

const AssessmentResultPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const result = location.state?.result;

  const studentName = location.state?.studentName;

  const [questionScores, setQuestionScores] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("result: ", result);
    if (result) {
      setQuestionScores(
        result.question_assessments.map((q) => ({
          question_id: q.question_id,
          new_score: q.score,
        }))
      );
    }
  }, [result]);

  const handleScoreChange = (question_id, value) => {
    setQuestionScores((prev) =>
      prev.map((item) =>
        item.question_id === question_id
          ? { ...item, new_score: parseInt(value) || 0 }
          : item
      )
    );
  };

  const handleSubmit = async () => {
    const payload = { question_scores: questionScores };

    try {
      setIsSubmitting(true);

      const sendResponse = await updateAssessmentGrading(result.id, payload);
      console.log("sendResponse: ", sendResponse);
      if (sendResponse.status == 200) {
        navigate(-1);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!result) return <LoadingScreen />;

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  const overallPercentage = Math.round(
    (result.overall_score / result.overall_max_score) * 100
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">AI Analysis Result</h2>

      {/* Summary Box */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-800 font-semibold">
            Student: {studentName}
          </p>
          <p className="text-sm text-gray-500">
            Submitted:{" "}
            {new Date(result.submission_timestamp_utc).toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <p className="text-blue-600 text-4xl font-bold">
            {overallPercentage}/100
          </p>
          <div className="w-40 mt-2 h-2 bg-blue-100 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${overallPercentage}%` }}
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

      {/* Question Details */}
      {result.question_assessments.map((q, idx) => (
        <div
          key={q.id}
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm">
              Question {idx + 1}: {q.question_text}
            </h3>

            <span className="flex items-center text-xs font-medium text-red-500 whitespace-nowrap ml-4">
              <Bot className="w-4 h-4 mr-1" />
              AI Check: {q.rating_plagiarism}%
            </span>
          </div>

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
                <label className="text-sm mr-2">Adjust Score:</label>
                <input
                  type="number"
                  min={0}
                  max={q.max_score_possible}
                  value={
                    questionScores.find((s) => s.question_id === q.question_id)
                      ?.new_score || 0
                  }
                  onChange={(e) =>
                    handleScoreChange(q.question_id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm w-20"
                />
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

      {/* Summary Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          Final Feedback Summary
        </h3>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <p className="text-sm text-red-700">
            {result.summary_of_performance}
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
          <p className="text-sm text-green-800">
            {result.general_positive_feedback}
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <p className="text-sm text-yellow-800">
            {result.general_areas_for_improvement}
          </p>
        </div>
      </div>

      <div className="text-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-4 bg-blue cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Report"}
        </button>
      </div>

      {/* <button
        onClick={() => {
          console.log("questionScores: ", questionScores);
        }}
        disabled={isSubmitting}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        CHEKKKKKK GEMINX
      </button> */}
    </div>
  );
};

export default AssessmentResultPage;
