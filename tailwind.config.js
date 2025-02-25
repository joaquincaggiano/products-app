/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./theme/**/*.{js,jsx,ts,tsx}",
    "./auth/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit-Regular"],
        kanitThin: ["Kanit-Thin"],
        kanitBold: ["Kanit-Bold"],
      },
    },
  },
  plugins: [],
};
