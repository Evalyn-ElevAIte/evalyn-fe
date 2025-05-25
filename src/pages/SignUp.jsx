import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroBg from "../assets/images/hero_bg.png";

const SignUp = () => {
  return (
    <div
      className="min-h-[95vh] flex items-center justify-center bg-[#f3faff] bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="bg-white border border-yellow-300 rounded-[2rem] shadow-2xl w-full max-w-[90rem] flex flex-col md:flex-row overflow-hidden">
        {/* Left: Sign up form */}
        <div className="bg-[#eaf6ff] w-full md:w-1/2 p-20 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-blue-500 mb-4">
            Create <span className="text-yellow-500">Account</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Insert your account below:
          </p>

          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-6 py-4 bg-white">
              <FaUser className="text-yellow-500 text-xl" />
              <input
                type="text"
                placeholder="Name"
                className="outline-none flex-1 text-lg bg-transparent"
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-6 py-4 bg-white">
              <FaEnvelope className="text-yellow-500 text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="outline-none flex-1 text-lg bg-transparent"
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-6 py-4 bg-white">
              <FaLock className="text-yellow-500 text-xl" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1 text-lg bg-transparent"
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-6 py-4 bg-white">
              <FaLock className="text-yellow-500 text-xl" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="outline-none flex-1 text-lg bg-transparent"
              />
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg shadow-lg mt-6 text-xl">
              Sign up
            </button>
          </form>
        </div>

        {/* Right: Welcome message */}
        <div className="w-full md:w-1/2 p-20 flex flex-col justify-center items-center bg-white border-l border-yellow-300">
          <div className="text-yellow-500 text-8xl mb-10">🖐</div>
          <h3 className="text-4xl font-bold text-blue-500 mb-4">
            Hello, Fella!
          </h3>
          <p className="text-lg text-center text-gray-600 mb-8 max-w-md">
            Enter your details and start the amazing journey with Evalyn!
          </p>
          <p className="text-base text-yellow-500 italic mb-3">
            already have an account?
          </p>
          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-md text-lg"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
