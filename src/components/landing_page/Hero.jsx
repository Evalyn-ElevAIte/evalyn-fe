import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import EvalynLogo from "../../assets/logo/evalyn_logo.png";
import HeroBg from "../../assets/images/hero_bg.png";
import { ReactTyped } from "react-typed";
import { FaChevronRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 text-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="max-w-4xl mx-auto">
        <img
          src={EvalynLogo}
          alt="Evalyn Logo"
          className="mx-auto w-48 sm:w-56 md:w-64 mb-10 sm:mb-12"
        />

        <ReactTyped
          strings={["Easy.", "Fast.", "Reliable."]}
          typeSpeed={120}
          backSpeed={50}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue"
          loop
        />

        <div className="w-32 sm:w-48 h-1 rounded-full bg-yellow-500 mx-auto mt-8 sm:mt-10 mb-4 sm:mb-6" />

        <p className="text-gray-700 mb-16 sm:mb-24 text-base sm:text-lg md:text-xl flex justify-center flex-wrap">
          Improve your academic life with
          <span className="font-bold flex ml-2">
            <p className="text-blue">Eval</p>
            <p className="text-orange">yn</p>
          </span>
          !
        </p>

        <div className="flex justify-center gap-3 sm:gap-4">
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-xl shadow flex items-center gap-3 sm:gap-4 italic text-sm sm:text-base md:text-lg"
          >
            Sign up for free <FaChevronRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
