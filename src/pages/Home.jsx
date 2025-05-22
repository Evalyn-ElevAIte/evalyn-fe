import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { PiGraduationCap } from "react-icons/pi";

const Home = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-8 font-sans text-gray-800">
      <h1 className="text-2xl font-semibold mb-1">
        Hi, Sarah <span className="inline-block">👋</span>
      </h1>
      <p className="text-gray-500 mb-8">Ready to explore today?</p>

      <h2 className="text-lg font-medium mb-4">What would you like to do?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Create a Quiz */}
        <div className="border border-orange/50 rounded-xl p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition">
          <div className="text-3xl mb-4">
            <HiOutlineBookOpen size={86} className="text-blue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create a Quiz</h3>
          <p className="text-gray-600 mb-4">
            Design custom quizzes with various answer formats (text, multiple
            choice, or video). AI will help you review student answers.
          </p>
          <button className="bg-blue hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium cursor-pointer">
            + Create Quiz
          </button>
        </div>

        {/* Join a Quiz */}
        <div className="border border-orange/50 rounded-xl p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition">
          <div className="text-3xl mb-4">
            <PiGraduationCap size={86} className="text-blue" />
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium">
              Join
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4">Your Recent Activity</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Math Quiz */}
        <div className="border rounded-xl p-4 bg-blue-50">
          <div className="text-xl mb-1">📊 Math Quiz</div>
          <div className="text-sm text-gray-600 mb-2">3 new responses</div>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            New
          </span>
        </div>

        {/* AI Analysis */}
        <div className="border rounded-xl p-4 bg-green-50">
          <div className="text-xl mb-1">✅ AI Analysis Complete</div>
          <div className="text-sm text-gray-600 mb-2">
            Analyzed answers for 5 students
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Completed
          </span>
        </div>

        {/* History Quiz */}
        <div className="border rounded-xl p-4 bg-yellow-50">
          <div className="text-xl mb-1">⚠️ History Quiz</div>
          <div className="text-sm text-gray-600 mb-2">Ready for review</div>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Pending
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
