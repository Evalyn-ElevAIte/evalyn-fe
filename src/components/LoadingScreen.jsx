import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed flex inset-0 z-50 items-center justify-center w-full h-screen bg-black/5">
      <div className="w-36 h-36 rounded-full border-10 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
};

export default LoadingScreen;
