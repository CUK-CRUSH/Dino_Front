/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        rotate: "rotate 60s linear infinite",
        flowing: "flowing 20s linear infinite",
      },
      keyframes: {
        flowing: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-100%)" },
        },
      },
    },
    screens: {
      sm: { min: "375px", max: "720px" },
      md: { min: "721px", max: "1080px" },
      lg: { min: "1081px", max: "1440px" },
      xl: { min: "1441px", max: "1920px" },
      xxl: { min: "1921px" },
      smartPhone: { min: "400px", max: "430px" },
      tablet: { min: "768px", max: "1030px" },
    },
  },
  variants: {},
  plugins: [],
};
