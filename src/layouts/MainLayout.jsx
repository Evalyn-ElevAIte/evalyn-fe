import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Topbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>
      <div className="flex flex-1">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main
          className={`pt-20 flex-1 p-6 bg-[#f9fbfd] transition-all duration-300 ${
            isExpanded ? "ml-84" : "ml-32"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
