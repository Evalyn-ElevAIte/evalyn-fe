import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const StartBox = () => {
  return (
    <section className="bg-[#F3FAFF] py-24 sm:px-4">
      <div className="w-full px-10">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-white to-[#F3FAFF] border border-yellow-400 rounded-xl px-10 py-12 text-center shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Let’s start improving your academic life!
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Together we build a brighter future.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-5 rounded-xl shadow flex items-center gap-6 italic"
            >
              Sign up for free <FaChevronRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartBox;
