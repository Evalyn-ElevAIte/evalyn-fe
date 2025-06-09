import React from "react";
import { RiServiceLine } from "react-icons/ri";
import { FaBookOpen, FaChartLine, FaHistory } from "react-icons/fa";

const services = [
  {
    icon: <FaBookOpen className="text-blue text-3xl mb-4" />,
    title: "Quiz",
    description: "We offer an easy and interactive approach in creating quiz.",
  },
  {
    icon: <FaChartLine className="text-blue text-3xl mb-4" />,
    title: "Analysis",
    description:
      "Our AI powered analytic offer a quick way to analyze the answers of your quiz.",
  },
  {
    icon: <FaHistory className="text-blue text-3xl mb-4" />,
    title: "Tracking",
    description:
      "Our history tracker offer a reliable way in tracking performance of user.",
  },
];

const OurServices = () => {
  return (
    <section className="bg-[#F3FAFF]">
      <div className="py-20 sm:py-24 px-10 sm:px-8 lg:px-12 flex flex-col items-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <RiServiceLine size={56} className="text-orange" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Our Services</h2>

          <div className="w-24 sm:w-40 h-[4px] rounded-full bg-yellow-500 mx-auto mt-8 sm:mt-12 mb-4 sm:mb-6" />
          <p className="text-gray-700 mb-12 sm:mb-20 text-base sm:text-lg">
            Let's start our partnership by knowing each other!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-orange/40 shadow-md p-6 sm:p-8 text-center hover:shadow-lg transition duration-300"
            >
              {service.icon}
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
