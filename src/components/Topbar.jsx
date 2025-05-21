import React from "react";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 shadow-sm">
      <div className="text-lg font-semibold">Hi, Sarah 👋</div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default Topbar;
