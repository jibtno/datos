import React from "react";

const MapOne: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Philippines Regions
      </h4>
      <div className="h-90 flex items-center justify-center">
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full max-w-[500px]"
          fill="rgb(60, 80, 224)"
        >
          {/* Simplified Philippines map outline */}
          <path
            d="M100,50 L120,60 L140,80 L150,100 L160,130 L155,160 L140,180 
               L130,200 L110,220 L90,230 L70,220 L60,200 L50,170 L45,140 
               L50,110 L60,90 L80,70 L100,50"
            strokeWidth="2"
            stroke="#000"
            opacity="0.8"
          />
          {/* Luzon */}
          <circle cx="100" cy="100" r="10" fill="#fff" />
          <text x="120" y="100" className="text-xs">Luzon</text>
          
          {/* Visayas */}
          <circle cx="100" cy="160" r="10" fill="#fff" />
          <text x="120" y="160" className="text-xs">Visayas</text>
          
          {/* Mindanao */}
          <circle cx="100" cy="220" r="10" fill="#fff" />
          <text x="120" y="220" className="text-xs">Mindanao</text>
        </svg>
      </div>
      
      <div className="mt-4 flex justify-around text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary"></div>
          <span>Active Region</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#E2E8F0]"></div>
          <span>Inactive Region</span>
        </div>
      </div>
    </div>
  );
};

export default MapOne; 