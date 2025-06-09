import React, { useState, useEffect } from "react";
import { IoMenu, IoClose, IoNotificationsOutline } from "react-icons/io5";
import EvalynLogo from "../assets/logo/evalyn_logo.png";
import DummyPhoto from "../assets/images/dummy_profile.jpg";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/user";

const Topbar = ({ isExpanded, setIsExpanded }) => {
  const [hasNotification, setHasNotification] = useState(true);
  const [userName, setUserName] = useState("?");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userResponse = await Promise.all([getUser()]);
        const user = userResponse[0];
        if (user.status === 200) {
          setUserName(user.data.name);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center px-4 sm:px-8 h-20">
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            <div className="hover:bg-gray-200 p-1 rounded-full">
              {isExpanded ? <IoClose size={28} /> : <IoMenu size={28} />}
            </div>
          </button>

          <NavLink to="/home">
            <img
              src={EvalynLogo}
              alt="Evalyn Logo"
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
            />
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <IoNotificationsOutline className="text-2xl sm:text-3xl text-gray-700 rounded-full hover:bg-gray-200 p-1 cursor-pointer" />
            {hasNotification && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </div>

          <img
            src={
              userName
                ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userName
                  )}&background=random`
                : DummyPhoto
            }
            alt={userName || "User"}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
