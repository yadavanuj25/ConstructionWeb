/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [
    "text-green-500",
    "border-green-500",
    "bg-green-500",

    "text-red-600",
    "border-red-600",
    "bg-red-600",

    "text-blue-600",
    "border-blue-600",
    "bg-blue-600",

    "text-purple-600",
    "border-purple-600",
    "bg-purple-600",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
