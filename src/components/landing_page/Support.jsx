import React from "react";
import support1 from "../../assets/images/support1.jpg";
import support2 from "../../assets/images/support2.jpg";
import support3 from "../../assets/images/support3.jpg";
import { PiGraduationCapDuotone } from "react-icons/pi";

const supportSteps = [
  {
    number: "01",
    title: "Make a customizable quiz for all your academic purpose!",
    image: support1,
  },
  {
    number: "02",
    title: "Quickly analyze the result, saving time for everyone!",
    image: support2,
  },
  {
    number: "03",
    title: "Track your performance, improve everyday!",
    image: support3,
  },
];

const Support = () => {
  return (
    <section className="bg-[#F3FAFF] py-20 px-10 sm:px-12">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-24">
        <PiGraduationCapDuotone
          size={48}
          className="text-yellow-500 mx-auto mb-4"
        />
        <h2 className="text-2xl sm:text-3xl font-bold">
          We support every part of your lessons!
        </h2>
        <div className="w-24 sm:w-32 h-[3px] bg-yellow-500 mx-auto my-4 rounded" />
        <p className="text-gray-600 text-sm sm:text-base">
          Together we adapt for the better
        </p>
      </div>

      {/* Timeline container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Desktop vertical line */}
        <div className="hidden md:block absolute left-6 top-0 bottom-0 w-[3px] bg-yellow-400 z-0" />

        {/* Timeline items */}
        <div className="flex flex-col gap-16 sm:gap-20 relative z-10">
          {supportSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16"
            >
              {/* Left side: Text and number */}
              <div className="relative md:w-1/2">
                {/* Number circle */}
                <div className="">
                  <div className="md:absolute md:left-2 top-0 w-8 h-8 bg-yellow-500 rounded-full z-10 mb-4 md:mb-0" />
                  <div className="text-yellow-500 text-5xl md:text-7xl font-bold mb-4 md:ml-16">
                    {step.number}
                  </div>
                </div>

                <p className="text-gray-700 text-lg sm:text-xl font-semibold md:ml-16">
                  {step.title}
                </p>
              </div>

              {/* Right side: Image */}
              <div className="md:w-2/5 transform transition duration-500 hover:rotate-x-3 hover:-rotate-y-2 hover:scale-105 perspective-1000">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2">
                  <img
                    src={step.image}
                    alt={`Support step ${step.number}`}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
