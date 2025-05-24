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
    <div className="mt-16 text-center px-4 pt-12 pb-24">
      <h4 className="text-gray-500 mb-4 text-sm font-medium uppercase tracking-widest">
        Supported by
      </h4>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
        {supportedLogos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-12 md:h-24 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default SupportedBy;
