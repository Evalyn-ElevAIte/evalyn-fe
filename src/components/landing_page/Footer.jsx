import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import EvalynLogo from "../../assets/logo/evalyn_logo.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left: Logo and Description */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={EvalynLogo} alt="Evalyn Logo" className="w-24 m-4" />
          </div>
          <p className="text-gray-500 max-w-xl leading-relaxed text-sm md:text-base text-justify">
            Evalyn is a platform where students and professors alike could
            create custom quiz with AI powered analytical tool. With well
            documented and easy to access performance Evalyn will help you
            improve and adapt throughout your academic journey.
          </p>
        </div>

        {/* Right: Contact */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="text-gray-500 font-medium">Contact us</p>
          <div className="flex flex-col gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-white bg-blue-400 hover:bg-blue-500 p-3 rounded-full"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-white bg-blue hover:bg-blue-700 p-3 rounded-full"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue border-2 border-blue p-3 rounded-full hover:bg-blue/10"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
