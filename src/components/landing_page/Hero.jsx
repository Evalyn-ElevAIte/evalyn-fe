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
      className="relative bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4 text-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="max-w-4xl mx-auto">
        <img
          src={EvalynLogo}
          alt="Evalyn Logo"
          className="mx-auto w-64 mb-12"
        />
        <ReactTyped
          strings={["Easy.", "Fast.", "Reliable."]}
          typeSpeed={120}
          backSpeed={50}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-blue"
          loop
        />
        <div className="w-200 h-[4px] rounded-full bg-yellow-500 mx-auto mt-12 mb-6" />

        <p className="text-gray-700 mb-24 text-xl flex justify-center">
          Improve your academic life with
          <span className="font-bold flex ml-3">
            <p className="text-blue">Eval</p>
            <p className="text-orange">yn</p>
          </span>
          !
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
    </section>
  );
};

export default Hero;
