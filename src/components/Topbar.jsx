import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMenu, IoClose, IoNotificationsOutline } from "react-icons/io5";
import EvalynLogo from "../assets/logo/evalyn_logo.png";
import DummyPhoto from "../assets/images/dummy_profile.jpg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../services/user";

const Topbar = ({ isExpanded, setIsExpanded }) => {
  const [hasNotification, setHasNotification] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userResponse = await Promise.all([getUser()]);
        console.log("userResponse: ", userResponse);
        if (userResponse.status === 200) {
          setUserName(userResponse.data.name);
        }

        console.log("userResponse.data.name: ", userResponse.data.name);
      } catch (error) {
        console.error("Fetch error:", error);
        setRawDummyActivities([]);
      } finally {
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="fixed top-0 w-full">
      <div className="flex justify-between items-center px-8 h-27 border-b border-gray-100 shadow-sm bg-white z-50">
        <div className="ml-4 flex gap-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            <div className="hover:bg-gray-300 cursor-pointer  rounded-full flex items-center justify-center">
              {isExpanded ? <IoClose size={36} /> : <IoMenu size={36} />}
            </div>
          </button>

          <NavLink to="/home">
            <img
              src={EvalynLogo}
              alt="Evalyn Logo"
              className="h-12 w-auto object-contain cursor-pointer"
            />
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <IoNotificationsOutline className="text-4xl text-gray-700 rounded-full hover:bg-gray-300 cursor-pointer" />
            {hasNotification && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </div>

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=random`}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
