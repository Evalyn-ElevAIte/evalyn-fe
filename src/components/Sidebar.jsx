import React, { useState } from "react";
import { FaHistory, FaHome } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { getUserQuizzes, getUserQuizzesCreator } from "../services/user";
import { useEffect } from "react";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isEnrolledOpen, setIsEnrolledOpen] = useState(false);

  const [myQuizzes, setMyQuizzes] = useState([]);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);

  const navigate = useNavigate();

  const sidebarWidth = isExpanded ? "w-86" : "w-32";

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    navigate("/signin");
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  };

  const fetchMyQuizzes = async () => {
    try {
      const response = await getUserQuizzes();
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setEnrolledQuizzes(response.data);
        } else if (response.data?.message === "User has no quizzes.") {
          setEnrolledQuizzes([]);
        }
      }
    } catch (error) {
      console.log("error :", error);
      setEnrolledQuizzes([]);
    }
  };

  const fetchMyQuizzesCreator = async () => {
    try {
      const response = await getUserQuizzesCreator();
      console.log("myQuizzesResponse: ", response);
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setMyQuizzes(response.data);
        } else if (response.data?.message === "User has no quizzes.") {
          setMyQuizzes([]);
        }
      }
    } catch (error) {
      console.log("error :", error);
      setMyQuizzes([]);
    }
  };

  useEffect(() => {
    fetchMyQuizzes();
    fetchMyQuizzesCreator();
  }, []);

  const viewQuizHandle = (quiz_id) => {
    navigate(`/quiz-info/${quiz_id}`);
  };

  return (
    <div
      className={`fixed top-27 -left-1 ${sidebarWidth} h-screen bg-[#e8f1fb] flex flex-col justify-between pl-0 pr-4 py-4 rounded-r-4xl shadow-md border border-[#F2AA32]/55 z-50 transition-all duration-300 ease-in-out`}
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div>
        <nav className="space-y-2 mt-4">
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

          {isExpanded && (
            <div className="border-t border-[#F2AA32] mr-8 my-6" />
          )}

          {/* My Quizzes */}
          <div
            className={`w-full pl-14 py-4 text-lg cursor-pointer rounded-r-full flex items-center text-gray-600 hover:bg-white hover:shadow-sm transition-all duration-200 ${
              isQuizOpen ? "border border-orange" : ""
            }`}
            onClick={() => {
              setIsQuizOpen(!isQuizOpen);
              if (!isExpanded) setIsExpanded(true);
              setIsEnrolledOpen(false);
              if (isQuizOpen) {
                navigate("/quizzes");
              }
            }}
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

          {isExpanded && isQuizOpen && (
            <div className="ml-14 mt-4 space-y-3">
              {myQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  onClick={() => {
                    viewQuizHandle(quiz.id);
                  }}
                  className="flex gap-2 items-center py-3 px-5 bg-white rounded-full shadow-sm hover:shadow-xl cursor-pointer text-sm text-gray-700"
                >
                  <div className="bg-[#F2AA32] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    P
                  </div>
                  <div>
                    <div className="font-semibold truncate w-28">
                      {quiz.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      due to:{" "}
                      {quiz.end_time &&
                        new Date(quiz.end_time).toLocaleDateString(
                          "en-US",
                          options
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enrolled Courses Dropdown */}
          <div
            className={`w-full pl-14 mt-4
               py-4 text-lg cursor-pointer rounded-r-full flex items-center text-gray-600 hover:bg-white hover:shadow-sm transition-all duration-200 ${
                 isEnrolledOpen ? "border border-orange" : ""
               }`}
            onClick={() => {
              setIsEnrolledOpen(!isEnrolledOpen);
              if (!isExpanded) setIsExpanded(true);
              if (isQuizOpen) setIsQuizOpen(false);
              if (isEnrolledOpen) {
                navigate("/quizzes");
              }
            }}
          >
            {isExpanded &&
              (isEnrolledOpen ? (
                <RiArrowUpSFill size={24} className="text-orange" />
              ) : (
                <RiArrowDownSFill size={24} className="text-orange" />
              ))}
            <div
              className={`ml-2 flex items-center gap-4 ${
                isEnrolledOpen ? "text-blue font-bold" : ""
              }`}
            >
              <BsFillPersonFill size={18} />
              {isExpanded && <span>Enrolled</span>}
            </div>
          </div>

          {isExpanded && isEnrolledOpen && (
            <div className="ml-14 mt-4 space-y-3">
              {enrolledQuizzes.map((course, index) => (
                <div
                  key={index}
                  onClick={() => {
                    viewQuizHandle(course.id);
                  }}
                  className="flex gap-2 items-center py-3 px-5 bg-white rounded-full shadow-sm hover:shadow-xl cursor-pointer text-sm text-gray-700"
                >
                  <div className="bg-[#F2AA32] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    P
                  </div>
                  <div>
                    <div className="font-semibold truncate w-28">
                      {course.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      due to: {course.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>

      <div>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full flex items-center mb-4 gap-6 pl-14 py-4 text-lg text-left rounded-l-none rounded-r-full cursor-pointer transition-all duration-200 ${
              isActive
                ? "bg-white text-blue font-bold border border-[#F2AA32]"
                : "hover:bg-white hover:shadow-sm text-gray-600"
            }`
          }
        >
          <LuSettings size={18} />
          {isExpanded && <span>Settings</span>}
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center mb-8 gap-6 pl-14 py-4 text-lg text-left rounded-l-none rounded-r-full cursor-pointer transition-all duration-200 hover:bg-white hover:shadow-sm text-red-600"
        >
          <FiLogOut size={18} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
