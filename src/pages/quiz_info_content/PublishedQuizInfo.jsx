import React, { useEffect, useState } from "react";
import { LineChart, PieChart, Info, Calendar } from "lucide-react";
import {
  PieChart as RechartsChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getQuizStatistics } from "../../services/assessments";

const PublishedQuizInfo = ({ quiz, quiz_id }) => {
  const [overview, setOverview] = useState(null);
  const [activeTab, setActiveTab] = useState("top");
  const handleCopy = () => {
    navigator.clipboard.writeText(quiz.join_code);
    alert("Quiz code copied!");
  };
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getQuizStatistics(quiz_id);
        console.log("statisticResponse: ", response);
        if (response.status === 200) {
          setOverview(response.data);
          console.log("response.data: ", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz statistics:", error);
      }
    };
    fetchStats();
  }, [quiz_id]);

  if (!overview) return <div className="text-center mt-10">Loading...</div>;

  const gradeData = [
    {
      name: "A",
      value: overview.grade_distribution["A (90-100%)"],
      color: "#22c55e",
      range: "90-100%",
    },
    {
      name: "B",
      value: overview.grade_distribution["B (80-89%)"],
      color: "#3b82f6",
      range: "80-89%",
    },
    {
      name: "C",
      value: overview.grade_distribution["C (70-79%)"],
      color: "#eab308",
      range: "70-79%",
    },
    {
      name: "D",
      value: overview.grade_distribution["D (60-69%)"],
      color: "#f97316",
      range: "60-69%",
    },
    {
      name: "F",
      value: overview.grade_distribution["F (0-59%)"],
      color: "#ef4444",
      range: "0-59%",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{`${data.name}: ${data.value} students`}</p>
          <p className="text-sm text-gray-600">{`${(
            (data.value / overview.total_assessments) *
            100
          ).toFixed(1)}%`}</p>
          <p className="text-xs text-gray-500">Grade range: {data.range}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">Quiz Overview</h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-semibold text-blue-600">
            {quiz.join_code}
          </span>
          <button
            onClick={handleCopy}
            className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300 cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Quiz ID: {quiz_id} - Comprehensive performance analytics
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-1">Total Assessments</p>
          <h2 className="text-3xl font-bold">{overview.total_assessments}</h2>
          <p className="text-sm text-gray-500">Total attempts</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-1">Average Score</p>
          <h2 className="text-3xl font-bold">
            {overview.average_score} / {overview.max_score}
          </h2>
          <p className="text-sm text-gray-500">
            {overview.average_percentage.toFixed(2)}%
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-1">Score Range</p>
          <h2 className="text-3xl font-bold">
            <span className="text-red-500">▼ {overview.min_score}</span>
            <span className="mx-2">–</span>
            <span className="text-green-600">▲ {overview.max_score}</span>
          </h2>
          <p className="text-sm text-gray-500">Min – Max Score</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-gray-600">Assessment Period:</p>
          <span className="ml-2">
            {new Date(overview.earliest_assessment).toLocaleDateString()} to{" "}
            {new Date(overview.latest_assessment).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-2">Grade Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </RechartsChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-2">Suggestions & Warnings</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>📉 Average score is under expected threshold.</li>
            <li>🔍 Consider reviewing quiz content or student preparation.</li>
            <li>
              ⚠ {overview.grade_distribution["F (0-59%)"]} students received
              failing grades (F).
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setActiveTab("top")}
            className={`px-4 py-2 text-sm rounded ${
              activeTab === "top"
                ? "bg-blue text-white"
                : "bg-gray-200 hover:bg-blue hover:text-white cursor-pointer"
            }`}
          >
            Top Performers
          </button>
          <button
            onClick={() => setActiveTab("bottom")}
            className={`px-4 py-2 text-sm rounded ${
              activeTab === "bottom"
                ? "bg-blue  text-white"
                : "bg-gray-200 hover:bg-blue hover:text-white cursor-pointer"
            }`}
          >
            Bottom Performers
          </button>
        </div>
        <div>
          {(activeTab === "top"
            ? overview.top_performers
            : overview.bottom_performers
          ).length > 0 && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Max</th>
                  <th className="p-3">%</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === "top"
                  ? overview.top_performers
                  : overview.bottom_performers
                ).map((s, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{s.student_name}</td>
                    <td className="p-3">{s.score}</td>
                    <td className="p-3">{s.max_score}</td>
                    <td className="p-3">{s.percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishedQuizInfo;
