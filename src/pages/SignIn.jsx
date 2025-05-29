import React from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroBg from "../assets/images/hero_bg.png";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/auth";
import { getUser } from "../services/user";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandle = async () => {
    try {
      const signInResponse = await login(email, password);
      console.log("signInResponse: ", signInResponse);
      if (signInResponse.status == 200) {
        const access_token = signInResponse.data.access_token;
        localStorage.setItem("evalyn_token", access_token);
        console.log("access_token: ", access_token);
        toast.success("Sign up successful! Redirecting to login...");
        const userResponse = await getUser();
        if (userResponse.status == 200) {
          console.log("userResponse: ", userResponse);
          const username = userResponse.data.name;
          console.log("username: ", username);
          localStorage.setItem("evalyn_username", username);
          setTimeout(() => {
            navigate("/home");
          }, 2500);
        }
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div
      className="min-h-[95vh] flex items-center justify-center bg-[#f3faff] bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white border border-yellow-300 rounded-[2rem] shadow-2xl w-full max-w-6xl h-[720px] flex flex-col md:flex-row overflow-hidden">
        {/* Left: Welcome back */}
        <div className="w-full md:w-1/2 bg-white p-16 flex flex-col justify-center items-center border-r border-yellow-300">
          <FaArrowLeft className="text-blue-500 text-6xl mb-6" />
          <h3 className="text-3xl font-bold text-blue-500 mb-2">
            Welcome Back!
          </h3>
          <p className="text-base text-center text-gray-600 mb-8 max-w-sm">
            Please enter your credentials to access your account
          </p>
          <p className="text-sm text-yellow-500 italic mb-2">
            don’t have any account?
          </p>
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-md text-base"
          >
            Sign up
          </Link>
        </div>

        {/* Right: Form */}
        <div className="bg-[#eaf6ff] w-full md:w-1/2 p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-blue-500 mb-2">
            Sign in into <span className="text-yellow-500">Evalyn</span>
          </h2>
          <p className="text-base text-gray-600 mb-10">
            Insert your account below:
          </p>

          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-6 py-4 bg-white">
              <FaEnvelope className="text-yellow-500 text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="outline-none flex-1 text-lg bg-transparent"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-3 border border-yellow-400 rounded-full px-6 py-4 bg-white">
              <FaLock className="text-yellow-500 text-xl" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1 text-lg bg-transparent"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              type="button"
              onClick={signInHandle}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg shadow-lg mt-6 text-xl"
            >
              Sign in
            </button>
          </form>
        </div>
        {/* <button
          onClick={() => {
            console.log("email: ", email);
            console.log("password: ", password);
          }}
          className="bg-blue p-6"
        >
          Check
        </button> */}
      </div>
    </div>
  );
};

export default SignIn;
