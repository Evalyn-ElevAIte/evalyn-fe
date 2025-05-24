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
    <div>
      <section className="bg-[#F3FAFF]">
        <div className="py-48 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <RiServiceLine size={64} className="text-orange" />
            </div>
            <h2 className="text-3xl font-semibold">Our services</h2>

            <div className="w-160 h-[4px] rounded-full bg-yellow-500 mx-auto mt-12 mb-6" />
            <p className="text-gray-700 mb-24 text-lg flex justify-center">
              Let's start our partnership by knowing each other!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 max-w-6xl">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-orange/50 shadow-md p-8 text-left hover:shadow-lg transition duration-300"
                >
                  {service.icon}
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
