import React from "react";
import komdigi from "../../assets/logo/komdigi_logo.png";
import microsoft from "../../assets/logo/microsoft_logo.png";
import mereka from "../../assets/logo/mereka_logo.png";
import elevaite from "../../assets/logo/elevaite_logo.png";
import bijiBiji from "../../assets/logo/biji_biji_logo.png";

const supportedLogos = [
  { name: "Komdigi", src: komdigi },
  { name: "Microsoft", src: microsoft },
  { name: "Mereka", src: mereka },
  { name: "Elevaite", src: elevaite },
  { name: "Biji Biji", src: bijiBiji },
];

const SupportedBy = () => {
  return (
    <div className="mt-12 sm:mt-16 text-center px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-16 sm:pb-24">
      <h4 className="text-gray-500 mb-6 text-xs sm:text-sm font-medium uppercase tracking-wider">
        Supported by
      </h4>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
        {supportedLogos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-10 sm:h-14 md:h-20 object-contain max-w-[140px]"
          />
        ))}
      </div>
    </div>
  );
};

export default SupportedBy;
