/** @type {import('tailwindcss').Config} */
const { MAIN, SEMANTIC } = require("./src/constants/color").COLORS;
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      height: {
        17: "70px",
        31: "130px",
        51: "12.5rem",
        76: "308px",
      },
      width: {
        63: "250px",
        81: "354px",
        92: "370px",
      },
      fontSize: {
        "2xxl": "28px",
      },
      borderWidth: {
        6: "6px",
      },
      colors: {
        primary: MAIN.PRIMARY,
        secondary: MAIN.SECONDARY,
        neutrals: MAIN.NEUTRALS,
        green: SEMANTIC.GREEN,
        blue: SEMANTIC.BLUE,
        red: SEMANTIC.RED,
        amber: SEMANTIC.AMBER,
      },
      borderRadius: {
        "2.5xl": "20px",
      },
    },
    fontFamily: {
      equipE: ["Equip-Extended"],
      inter: ["Inter"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["first", "last"],
    },
  },
  plugins: [],
};
