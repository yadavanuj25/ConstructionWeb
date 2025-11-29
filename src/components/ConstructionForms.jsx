import React, { useEffect, useRef, useState } from "react";
import PageLogo from "./PageLogo";

const ConstructionForm = () => {
  const [selectedColor, setSelectedColor] = useState("Green");
  const [toggle, setToggle] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(50);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       let step = speed / 2;
  //       let next = prev + step;
  //       if (next > 100) {
  //         return 0;
  //       }
  //       return next;
  //     });
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [speed]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       let step = speed / 10;
  //       let next = prev + step;
  //       if (reverse) {
  //         if (prev <= 0) return 100;
  //         return prev - 1;
  //       }

  //       if (prev >= 100) return 0;
  //       return prev + 1;
  //     });
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [reverse]);

  useEffect(() => {
    // const intervalSpeed = 50 - speed * 0.2;
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
    }, 100);
    return () => clearInterval(id);
  }, [speed, reverse]);

  const handleReverse = () => {
    setReverse(!reverse);
  };
  // const handleReverse = () => {
  //   setReverse((prev) => {
  //     const newValue = !prev;
  //     if (newValue === true) {
  //       setProgress(100);
  //     }
  //     return newValue;
  //   });
  // };

  const handleChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleRange = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-10 px-5">
      <div>
        <PageLogo />
      </div>
      <select
        value={selectedColor}
        onChange={handleChange}
        className="mt-8 bg-gray-100 px-5 py-4 w-80 rounded-xl shadow-md "
      >
        <option value="green-500">Green</option>
        <option value="red-600">Red</option>
        <option value="blue-600">Blue</option>
        <option value="purple-600">Purple</option>
      </select>
      {/* Range */}
      <input
        type="range"
        className={`w-80 mt-6 accent-${selectedColor}`}
        min="1"
        max="100"
        value={speed}
        onChange={handleRange}
      />
      <input
        type="text"
        placeholder="Total Items"
        className={`mt-6 w-80 text-${selectedColor} border border-${selectedColor}  px-4 py-3 rounded-xl shadow`}
      />
      <input
        type="text"
        placeholder=" Items in Line"
        className={`mt-6 w-80 text-${selectedColor} border border-${selectedColor}  px-4 py-3 rounded-xl shadow`}
      />
      <div className="w-80 mt-6 flex items-center justify-between">
        <button>Reverse</button>
        <div className="flex items-center justify-center">
          <button
            onClick={handleReverse}
            className={`w-8 h-8 rounded-full bg-${selectedColor}`}
          ></button>
        </div>
      </div>
      {/* Bottom progress line */}
      <div className="w-full h-4 border-[2px] border-black bg-gray-300 rounded-full my-6 overflow-hidden">
        <div
          className={`bg-red-600 h-full rounded-full transition-all `}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConstructionForm;
