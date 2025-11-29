import React, { useEffect, useState } from "react";
import PageLogo from "./PageLogo";

const ConstructionForm = () => {
  const [selectedColor, setSelectedColor] = useState("green-500");
  const [reverse, setReverse] = useState(false);
  const [progress, setProgress] = useState(0);

  const [speed, setSpeed] = useState(50);
  const animationSpeedMap = {
    0: 120,
    50: 40,
    100: 10,
  };

  const intervalSpeed = animationSpeedMap[speed];

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => {
        if (!reverse) {
          return prev >= 100 ? 0 : prev + 1;
        } else {
          return prev <= 0 ? 100 : prev - 1;
        }
      });
    }, intervalSpeed);

    return () => clearInterval(id);
  }, [reverse, intervalSpeed]);

  const colorMap = {
    "green-500": "#22c55e",
    "red-600": "#dc2626",
    "blue-600": "#2563eb",
    "purple-600": "#9333ea",
  };

  const snapSpeed = (value) => {
    if (value < 25) return 0;
    if (value < 75) return 50;
    return 100;
  };

  return (
    <div className="w-full min-h-screen bg-[#f3eef6] flex flex-col items-center justify-center py-10 px-5">
      <div className="mt-6">
        <PageLogo />
      </div>

      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className={`mt-6 bg-white px-5 py-4 w-80 rounded-xl border border-${selectedColor} outline-none`}
      >
        {" "}
        <option value="green-500">Green</option>{" "}
        <option value="red-600">Red</option>{" "}
        <option value="blue-600">Blue</option>{" "}
        <option value="purple-600">Purple</option>{" "}
      </select>

      <div className="relative w-80 mt-8 group">
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(snapSpeed(Number(e.target.value)))}
          className="w-full h-2 rounded-lg "
          style={{ accentColor: colorMap[selectedColor] }}
        />
        <div
          className={`absolute -top-5 px-2 py-1 rounded-full text-white text-xs font-bold bg-${selectedColor} opacity-0 group-hover:opacity-100 transition-opacity`}
          style={{
            left: `${speed}%`,
            transform: "translateX(-50%)",
          }}
        >
          {speed === 0 ? "Slow" : speed === 50 ? "Medium" : "Fast"}
        </div>
      </div>

      <input
        type="text"
        placeholder="Total Items"
        className={`mt-6 w-80 px-4 py-3 rounded-xl border text-${selectedColor} border-${selectedColor} outline-none`}
      />

      <input
        type="text"
        placeholder="Items in Line"
        className={`mt-6 w-80 px-4 py-3 rounded-xl border text-${selectedColor} border-${selectedColor} outline-none `}
      />

      <div className="w-80 mt-8 flex items-center justify-between">
        <span className="font-semibold text-gray-800 text-lg">Reverse</span>
        <div
          onClick={() => setReverse(!reverse)}
          className={`w-12 h-7 flex items-center rounded-full cursor-pointer transition-all relative 
            ${reverse ? `bg-${selectedColor}` : "bg-gray-600"}`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full absolute transform transition-all
              ${reverse ? "translate-x-5" : "translate-x-1"}`}
          ></div>
        </div>
      </div>

      <div className="w-full px-4 mt-10">
        <div className="w-full h-6 border border-black rounded-full bg-white overflow-hidden">
          <div
            className={`h-full transform bg-${selectedColor}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionForm;
