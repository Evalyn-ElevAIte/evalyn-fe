import React from "react";
import { CiLogin } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { PiGraduationCap } from "react-icons/pi";
import {
  Book,
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  Send,
} from "lucide-react"; // Import Lucide icons for Recent Activity

const Home = () => {
  // Dummy data for the "Your Recent Activity" section, taking 3 items from the provided dummyActivities
  const rawDummyActivities = [
    {
      day: "Today",
      type: "My Quizzes", // Corresponds to 'You created a new quiz:'
      status: "created",
      quizTitle: "Introduction to Philosophy",
      message: "Quiz created! Keep an eye on it regularly.",
      time: "2 hours ago",
    },
    {
      day: "Today",
      type: "Enrolled", // Corresponds to 'New submission:'
      status: "unfinished",
      quizTitle: "Mathematics Basics",
      message: "New quiz is out—make sure to complete it on time!",
      time: "6 hours ago",
    },
    {
      day: "Yesterday",
      type: "Enrolled", // Corresponds to 'You have submitted quiz:'
      status: "submitted",
      quizTitle: "Biology 101",
      message: "Your score is coming soon, hang tight!",
      time: "1 day ago",
    },
    {
      day: "Yesterday",
      type: "Enrolled", // Corresponds to 'Your submission has just been graded:'
      status: "graded",
      quizTitle: "Chemistry Fundamentals",
      message: "Sarah Johnson completed the quiz",
      time: "1 day ago",
    },
    {
      day: "Yesterday",
      type: "My Quizzes", // Corresponds to 'You created a new quiz:' (as per image)
      status: "done", // This status is used for the "All the participant already finish the quiz" message
      quizTitle: "Chemistry Fundamentals",
      message: "All the participant already finish the quiz",
      time: "1 day ago",
    },
  ];

  // Map the first 3 items from rawDummyActivities to the structure needed for recentActivities
  const recentActivities = rawDummyActivities.slice(0, 3).map((item, index) => {
    let iconComponent;
    let statusText;
    let statusBg;
    let statusColor;
    let titlePrefix;

    // Determine icon, status text, and colors based on the item's type and status
    if (item.type === "My Quizzes") {
      if (item.status === "created") {
        iconComponent = <FileText size={48} className="text-blue-700" />; // Increased icon size
        statusText = "New";
        statusBg = "bg-blue-100";
        statusColor = "text-blue-700";
        titlePrefix = "Quiz Created:";
      } else if (item.status === "done") {
        iconComponent = <CheckCircle size={48} className="text-green-700" />; // Increased icon size
        statusText = "Completed";
        statusBg = "bg-green-100";
        statusColor = "text-green-700";
        titlePrefix = "Quiz Finished:";
      }
    } else if (item.type === "Enrolled") {
      if (item.status === "unfinished") {
        iconComponent = <Clock size={48} className="text-orange-500" />; // Increased icon size
        statusText = "Pending"; // Using Pending for unfinished as per common UI patterns
        statusBg = "bg-orange-100";
        statusColor = "text-orange-700";
        titlePrefix = "New Submission:";
      } else if (item.status === "submitted") {
        iconComponent = <Send size={48} className="text-purple-700" />; // Increased icon size
        statusText = "Submitted";
        statusBg = "bg-purple-100";
        statusColor = "text-purple-700";
        titlePrefix = "Quiz Submitted:";
      } else if (item.status === "graded") {
        iconComponent = <CheckCircle size={48} className="text-green-700" />; // Increased icon size
        statusText = "Graded";
        statusBg = "bg-green-100";
        statusColor = "text-green-700";
        titlePrefix = "Quiz Graded:";
      }
    }

    return {
      id: index, // Using index as ID for simplicity
      icon: iconComponent,
      title: `${titlePrefix} ${item.quizTitle}`, // Combine prefix and quizTitle for the main title
      description: item.message,
      status: statusText,
      statusBg: statusBg,
      statusText: statusColor,
    };
  });

  return (
    <div className="min-h-screen bg-white px-6 py-8 font-sans text-gray-800">
      <h1 className="text-2xl font-semibold mb-1">
        Hi, Sarah <span className="inline-block">👋</span>
      </h1>
      <p className="text-gray-500 mb-12">Ready to explore today?</p>

      <h2 className="text-lg font-medium mb-4">What would you like to do?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border border-orange/50 rounded-xl p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition">
          <div className="text-3xl mb-4">
            <HiOutlineBookOpen size={86} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create a Quiz</h3>
          <p className="text-gray-600 mb-4">
            Design custom quizzes with various answer formats (text, multiple
            choice, or video). AI will help you review student answers.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium cursor-pointer">
            + Create Quiz
          </button>
        </div>

        <div className="border border-orange/50 rounded-xl p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition">
          <div className="text-3xl mb-4">
            <PiGraduationCap size={86} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Join a Quiz</h3>
          <p className="text-gray-600 mb-4">
            Enter a quiz code to participate and get AI-based feedback on your
            answers.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter quiz code..."
              className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-medium cursor-pointer flex gap-4 items-center">
              <CiLogin size={24} className="text-white" />
              Join
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4">Your Recent Activity</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="border border-orange/50 rounded-xl p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition"
          >
            <div className="flex justify-between mb-3">
              <div className=" items-center gap-3">
                {activity.icon}
                <div className="text-lg font-semibold text-gray-800 mt-6">
                  {activity.title}
                </div>
              </div>
              <span
                className={`text-sm h-8 px-3 py-1 rounded-full font-medium ${activity.statusBg} ${activity.statusText} flex items-center`}
              >
                {activity.status}
              </span>
            </div>
            <div className="text-base text-gray-600">
              {activity.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
