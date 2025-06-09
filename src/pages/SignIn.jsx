import React, { useState } from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import HeroBg from "../assets/images/hero_bg.png";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../services/auth";
import LoadingScreen from "../components/LoadingScreen";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signInHandle = async () => {
    setIsLoading(true);
    try {
      const signInResponse = await login(email, password);
      if (signInResponse.status === 200) {
        const access_token = signInResponse.data.access_token;
        localStorage.setItem("evalyn_token", access_token);
        toast.success("Sign in successful! Redirecting...");
        setTimeout(() => navigate("/home"), 3000);
      }
    } catch (error) {
      console.log("error :", error);
      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#f3faff] bg-cover bg-center px-6 py-12"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      {isLoading && <LoadingScreen />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="bg-white shadow-lg rounded-xl"
        bodyClassName="text-base font-semibold"
      />

      <div className="bg-white border border-yellow-300 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 px-8 py-12 sm:px-12 sm:py-16 bg-white flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-yellow-300 text-center">
          <FaArrowLeft className="text-blue-500 text-4xl mb-6" />
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2">
            Welcome Back!
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-sm">
            Please enter your credentials to access your account
          </p>
          <p className="text-sm text-yellow-500 italic mb-2">
            Don’t have an account?
          </p>
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-md text-sm sm:text-base"
          >
            Sign up
          </Link>
        </div>

        {/* Right Section: Form */}
        <div className="bg-[#eaf6ff] w-full md:w-1/2 px-8 py-12 sm:px-12 sm:py-16 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-blue-500 mb-2">
            Sign in to <span className="text-yellow-500">Evalyn</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-10">
            Insert your account below:
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              signInHandle();
            }}
          >
            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-5 py-3 bg-white w-full">
              <FaEnvelope className="text-yellow-500 text-lg" />
              <input
                type="email"
                placeholder="Email"
                className="outline-none flex-1 text-sm sm:text-base bg-transparent placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-5 py-3 bg-white w-full">
              <FaLock className="text-yellow-500 text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1 text-sm sm:text-base bg-transparent placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg mt-4 text-sm sm:text-lg"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
