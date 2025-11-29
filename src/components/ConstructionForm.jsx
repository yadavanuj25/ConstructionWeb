import React, { useEffect, useState } from "react";
import PageLogo from "./PageLogo";

const ConstructionForm = () => {
  const [selectedColor, setSelectedColor] = useState("green-500");
  const [reverse, setReverse] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(50);

  // Auto animation speed
  const intervalSpeed = Math.max(10, 200 - speed * 1.5);

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

  return (
    <div className="w-full min-h-screen bg-[#f3eef6] flex flex-col items-center justify-start py-10 px-5">
      {/* LOGO */}
      <div className="mt-10">
        <PageLogo />
      </div>

      {/* COLOR SELECT */}
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="mt-10 bg-white px-5 py-4 w-80 rounded-xl  border border-gray-300"
      >
        <option value="green-500">Green</option>
        <option value="red-600">Red</option>
        <option value="blue-600">Blue</option>
        <option value="purple-600">Purple</option>
      </select>

      {/* SPEED SLIDER */}
      <input
        type="range"
        className={`w-80 mt-6 `}
        min="1"
        max="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        style={{ accentColor: colorMap[selectedColor] }}
      />

      {/* TOTAL ITEMS */}
      <input
        type="text"
        placeholder="Total Items"
        className={`mt-6 w-80 px-4 py-3 rounded-xl  border text-${selectedColor} border-${selectedColor}`}
      />

      {/* ITEMS IN LINE */}
      <input
        type="text"
        placeholder="Items in Line"
        className={`mt-6 w-80 px-4 py-3 rounded-xl  border text-${selectedColor} border-${selectedColor}`}
      />

      {/* REVERSE TOGGLE */}
      <div className="w-80 mt-8 flex items-center justify-between">
        <span className="font-semibold text-gray-800 text-lg">Reverse</span>

        <div
          onClick={() => setReverse(!reverse)}
          className={`w-12 h-7 flex items-center rounded-full cursor-pointer transition-all relative 
            ${reverse ? `bg-${selectedColor}` : "bg-gray-300"}`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full  absolute transform transition-all
              ${reverse ? "translate-x-5" : "translate-x-1"}`}
          ></div>
        </div>
      </div>

      {/* PROGRESS BAR */}
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
