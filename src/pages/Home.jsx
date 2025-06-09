import React, { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { PiGraduationCap } from "react-icons/pi";
import { FileText, CheckCircle, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllUserQuizzes, getUser } from "../services/user";
import { joinQuiz } from "../services/quiz";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const [rawDummyActivities, setRawDummyActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isFinishFetch, setIsFinishFetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [userResponse, rawResponse] = await Promise.all([
          getUser(),
          getAllUserQuizzes(),
        ]);
        if (userResponse.status === 200) {
          setUserName(userResponse.data.name);
        }
        setRawDummyActivities(
          Array.isArray(rawResponse.data) ? rawResponse.data : []
        );
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
        setIsFinishFetch(true);
      }
    };
    fetchAll();
  }, []);

  const recentActivities = (rawDummyActivities || [])
    .slice(0, 3)
    .map((item) => {
      let icon, statusText, statusBg, statusColor, titlePrefix;

      const isPublished = item.status === null && !item.completed;
      const isDone = item.status === null && item.completed;
      const isUnfinished = item.status === "unfinished";
      const isSubmitted = item.status === "submited";
      const isGraded = item.status === "graded";

      if (isPublished) {
        icon = <FileText size={48} className="text-blue-600" />;
        statusText = "Published";
        statusBg = "bg-blue-100";
        statusColor = "text-blue-700";
        titlePrefix = "Quiz Created:";
      } else if (isDone) {
        icon = <CheckCircle size={48} className="text-green-700" />;
        statusText = "Completed";
        statusBg = "bg-green-100";
        statusColor = "text-green-700";
        titlePrefix = "Quiz Finished:";
      } else if (isUnfinished) {
        icon = <Clock size={48} className="text-orange-500" />;
        statusText = "Pending";
        statusBg = "bg-orange-100";
        statusColor = "text-orange-700";
        titlePrefix = "New Submission:";
      } else if (isSubmitted) {
        icon = <Send size={48} className="text-purple-700" />;
        statusText = "Submitted";
        statusBg = "bg-purple-100";
        statusColor = "text-purple-700";
        titlePrefix = "Quiz Submitted:";
      } else if (isGraded) {
        icon = <CheckCircle size={48} className="text-green-700" />;
        statusText = "Graded";
        statusBg = "bg-green-100";
        statusColor = "text-green-700";
        titlePrefix = "Quiz Graded:";
      } else {
        icon = <FileText size={48} className="text-gray-400" />;
        statusText = "Unknown";
        statusBg = "bg-gray-100";
        statusColor = "text-gray-700";
        titlePrefix = "Activity:";
      }

      return {
        id: item.id,
        icon,
        title: `${titlePrefix} ${item.title}`,
        description: item.description,
        status: statusText,
        statusBg,
        statusText: statusColor,
      };
    });

  const joinHandle = async () => {
    try {
      const response = await joinQuiz({ join_code: joinCode });
      if (response.status === 200) navigate("/success-join");
    } catch (error) {
      console.error("Join error:", error);
    }
  };

  const createQuizHandle = () => navigate("/create");
  const viewQuizHandle = (id) => navigate(`/quiz-info/${id}`);

  if (isLoading && !isFinishFetch) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white px-6 sm:px-10 py-20 font-sans text-gray-800">
      <h1 className="text-xl sm:text-2xl font-semibold mb-1">
        Hi, {userName} 👋
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mb-12">
        Ready to explore today?
      </p>

      <h2 className="text-base sm:text-lg font-medium mb-4">
        What would you like to do?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Create Quiz Card */}
        <div className="border border-orange/50 rounded-xl p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition">
          <div className="text-5xl mb-4">
            <HiOutlineBookOpen className="text-blue" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Create a Quiz
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Design custom quizzes with various answer formats (text, multiple or
            single choice). AI will help you review student answers.
          </p>
          <button
            onClick={createQuizHandle}
            className="bg-blue hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium text-sm sm:text-base"
          >
            + Create Quiz
          </button>
        </div>

        {/* Join Quiz Card */}
        <div className="border border-orange/50 rounded-xl p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition">
          <div className="text-5xl mb-4">
            <PiGraduationCap className="text-blue" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Join a Quiz</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Enter a quiz code to participate and get AI-based feedback on your
            answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <input
              type="text"
              placeholder="Enter quiz code..."
              className="border border-orange/50 rounded-2xl px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <button
              onClick={joinHandle}
              className="bg-blue hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium flex gap-2 items-center justify-center text-sm sm:text-base"
            >
              <CiLogin size={20} /> Join
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-base sm:text-lg font-medium mb-4">
        Your Recent Activity
      </h2>

      {recentActivities.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activities found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => viewQuizHandle(activity.id)}
              className="border border-orange/50 rounded-xl p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg cursor-pointer transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col items-start">
                  {activity.icon}
                  <div className="text-base sm:text-lg font-semibold text-gray-800 mt-4">
                    {activity.title}
                  </div>
                </div>
                <span
                  className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${activity.statusBg} ${activity.statusText} h-fit`}
                >
                  {activity.status}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
