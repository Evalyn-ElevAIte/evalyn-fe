import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import HeroBg from "../assets/images/hero_bg.png";
import { register } from "../services/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUpHandle = async () => {
    if (password !== confirmPassword) {
      toast.error("Please make sure your confirm password matches.");
    } else {
      try {
        const signUpResponse = await register(name, email, password);
        if (signUpResponse.status === 201) {
          toast.success("Sign up successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/signin");
          }, 2500);
        }
      } catch (error) {
        console.log("error :", error);
        if (error.response?.data?.detail === "Email already registered") {
          toast.error("Email already registered, please use another email!");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#f3faff] bg-cover bg-center px-6 py-12"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white border border-yellow-300 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Sign up form */}
        <div className="bg-[#eaf6ff] w-full md:w-1/2 px-8 py-12 sm:px-12 sm:py-16 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Create <span className="text-yellow-500">Account</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-10">
            Insert your account below:
          </p>

          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-5 py-3 bg-white w-full">
              <FaUser className="text-yellow-500 text-lg" />
              <input
                type="text"
                placeholder="Name"
                className="outline-none flex-1 text-sm sm:text-base bg-transparent placeholder-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-5 py-3 bg-white w-full">
              <FaEnvelope className="text-yellow-500 text-lg" />
              <input
                type="email"
                placeholder="Email"
                className="outline-none flex-1 text-sm sm:text-base bg-transparent placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-5 py-3 bg-white w-full">
              <FaLock className="text-yellow-500 text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1 text-sm sm:text-base bg-transparent placeholder-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-5 py-3 bg-white w-full">
              <FaLock className="text-yellow-500 text-lg" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="outline-none flex-1 text-sm sm:text-base bg-transparent placeholder-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={signUpHandle}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg mt-4 text-sm sm:text-lg"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Right: Welcome message */}
        <div className="w-full md:w-1/2 px-8 py-12 sm:px-12 sm:py-16 flex flex-col justify-center items-center bg-white border-t md:border-t-0 md:border-l border-yellow-300">
          <div className="text-yellow-500 text-6xl sm:text-7xl mb-8">🖐</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">
            Hello, Fella!
          </h3>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-6 max-w-md">
            Enter your details and start the amazing journey with Evalyn!
          </p>
          <p className="text-sm text-yellow-500 italic mb-3">
            Already have an account?
          </p>
          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md text-sm sm:text-base"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
