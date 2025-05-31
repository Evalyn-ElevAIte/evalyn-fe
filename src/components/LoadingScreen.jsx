import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      <div className="w-36 h-36 rounded-full border-10 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
};

export default LoadingScreen;
