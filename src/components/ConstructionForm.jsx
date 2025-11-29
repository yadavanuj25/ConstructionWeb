import React, { useEffect, useState } from "react";
import PageLogo from "./PageLogo";

const ConstructionForm = () => {
  const [selectedColor, setSelectedColor] = useState("green-500");
  const [reverse, setReverse] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(50);

  const intervalSpeed = Math.max(10, 200 - speed * 1.5);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => {
        if (!reverse) {
          if (prev >= 100) return 0;
          return prev + 1;
        } else {
          if (prev <= 0) return 100;
          return prev - 1;
        }
      });
    }, intervalSpeed);

    return () => clearInterval(id);
  }, [reverse, intervalSpeed]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-10 px-5">
      <PageLogo />

      <select
        value={selectedColor}
        onChange={(e) => {
          setSelectedColor(e.target.value);

          console.log(e.target.value);
        }}
        className="mt-8 bg-gray-100 px-5 py-4 w-80 rounded-xl shadow-md"
      >
        <option value="green-500">Green</option>
        <option value="red-600">Red</option>
        <option value="blue-600">Blue</option>
        <option value="purple-600">Purple</option>
      </select>

      <input
        type="range"
        className="w-80 mt-6"
        min="1"
        max="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />

      <input
        type="text"
        placeholder="Total Items"
        className={`mt-6 w-80 text-${selectedColor} border border-${selectedColor} px-4 py-3 rounded-xl shadow`}
      />

      <input
        type="text"
        placeholder="Items in Line"
        className={`mt-6 w-80 text-${selectedColor} border border-${selectedColor} px-4 py-3 rounded-xl shadow`}
      />

      <div className="w-80 mt-6 flex items-center justify-between">
        <span className="font-semibold">Reverse</span>
        <button
          onClick={() => setReverse(!reverse)}
          className={`w-5 h-5 p-2 border border-gray-800 bg-gray-300 rounded-full bg-${selectedColor} shadow`}
        ></button>
      </div>

      <div className="w-full h-5 border-2 border-black bg-gray-300 rounded-full my-6 overflow-hidden">
        <div
          className={`h-full rounded-full bg-${selectedColor} `}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConstructionForm;
