import React from "react";
import { FaHistory, FaHome } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

const Sidebar = ({ isExpanded }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const sidebarWidth = isExpanded ? "w-86" : "w-32";

  const dummyQuizzes = [
    {
      title: "Programming Basics",
      dueDate: "Tuesday, 20 Mei 2025",
    },
    {
      title: "Programming Logic",
      dueDate: "Tuesday, 20 Mei 2025",
    },
    {
      title: "Programming Final",
      dueDate: "Tuesday, 20 Mei 2025",
    },
  ];

  return (
    <div
      className={`fixed top-27 -left-1 ${sidebarWidth} h-screen bg-[#e8f1fb] flex flex-col justify-between pl-0 pr-4 py-4 rounded-r-4xl shadow-md border border-[#F2AA32]/55 z-50 transition-all duration-300 ease-in-out`}
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div>
        <nav className="space-y-2 mt-4">
          {/* Home */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `w-full flex items-center gap-6 pl-14 py-4 text-lg text-left rounded-l-none rounded-r-full cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue font-bold border border-[#F2AA32]"
                  : "hover:bg-white hover:shadow-sm text-gray-600"
              }`
            }
          >
            <FaHome size={18} />
            {isExpanded && <span>Home</span>}
          </NavLink>

          {/* Activity */}
          <NavLink
            to="/activity"
            className={({ isActive }) =>
              `w-full flex items-center gap-6 pl-14 py-4 text-left text-lg rounded-l-none rounded-r-full cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue font-bold border border-[#F2AA32]"
                  : "hover:bg-white hover:shadow-sm text-gray-600"
              }`
            }
          >
            <FaHistory size={18} />
            {isExpanded && <span>Activity</span>}
          </NavLink>

          {/* Divider */}
          {isExpanded && (
            <div className={`border-t border-[#F2AA32] mr-8 my-6`} />
          )}

          {/* Quizzes Dropdown */}
          <div
            className={`w-full pl-14 py-4 text-lg cursor-pointer rounded-r-full flex items-center text-gray-600 hover:bg-white hover:shadow-sm transition-all duration-200 ${
              isQuizOpen ? "border border-orange" : ""
            }`}
            onClick={() => setIsQuizOpen(!isQuizOpen)}
          >
            {isExpanded &&
              (isQuizOpen ? (
                <RiArrowUpSFill size={24} className="text-orange" />
              ) : (
                <RiArrowDownSFill size={24} className="text-orange" />
              ))}
            <div
              className={`ml-2 flex items-center gap-4 ${
                isQuizOpen ? "text-blue font-bold" : ""
              }`}
            >
              <GoBook size={18} />
              {isExpanded && <span>My Quizzes</span>}
            </div>
          </div>

          {/* Quiz Items */}
          {isExpanded && isQuizOpen && (
            <div className="ml-14 mt-4 space-y-3">
              {dummyQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="flex  gap-2 items-center py-3 px-5 bg-white rounded-full shadow-sm text-sm text-gray-700"
                >
                  <div className="bg-[#F2AA32] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    P
                  </div>
                  <div>
                    <div className="font-semibold truncate w-28">
                      {quiz.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      due to: {quiz.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* Settings */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex items-center gap-2 px-6 py-2 text-sm transition-all duration-200 ${
            isActive
              ? "text-blue-600 font-bold border border-[#F2AA32] bg-white rounded-full"
              : "text-gray-500 hover:text-gray-700"
          }`
        }
      >
        <LuSettings size={16} />
        {isExpanded && <span>Settings</span>}
      </NavLink>
    </div>
  );
};

export default Sidebar;
