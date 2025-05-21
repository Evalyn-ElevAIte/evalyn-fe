import React from "react";
import { FaHistory, FaHome } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#e8f1fb] h-full flex flex-col justify-between pl-0 pr-4 py-4 rounded-r-4xl shadow-md border border-[#F2AA32]/55">
      <div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-2 pl-14 py-4 text-left rounded-l-none rounded-r-full bg-white shadow-sm text-[#2676cb] font-medium border border-[#F2AA32]">
            <FaHome size={18} /> Home
          </button>
          <button className="w-full flex items-center gap-2 pl-14 py-4 text-left rounded-l-none rounded-r-full hover:bg-white hover:shadow-sm text-gray-600">
            <FaHistory size={18} /> Activity
          </button>
          <button className="w-full flex items-center gap-2 pl-14 pr-4 py-4 text-left rounded-l-none rounded-r-full hover:bg-white hover:shadow-sm text-gray-600">
            <GoBook size={18} /> My Quizzes
          </button>
        </nav>
      </div>
      <button className="flex items-center gap-2 px-6 py-2 text-sm text-gray-500 hover:text-gray-700">
        <LuSettings size={16} /> Settings
      </button>
    </div>
  );
};

export default Sidebar;
