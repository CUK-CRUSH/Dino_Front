const plugin = require("tailwindcss/plugin");
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
  // calc를 사용할 수 있게 만들어준다.
  mode: "jit",
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
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        title: "0 3px 10px rgba(0, 0, 0, 0.3)",
      },
      width : {
        buttonWidth: '92%',
      }
    },
    screens: {
      sm: { min: "375px", max: "720px" },
      md: { min: "721px", max: "1080px" },
      lg: { min: "1081px", max: "1440px" },
      xl: { min: "1441px", max: "1920px" },
      xxl: { min: "1921px" },
      smartPhoneXs: { min: "320px", max: "389px" },
      smartPhone: { min: "400px", max: "430px" },
      tabletMini: { min: "768px", max: "820px" },
      tablet: { min: "821px", max: "1030px" },
    },
    fontFamily : {
      PretendardBlack : ["Pretendard Black"],
      PretendardBold : ["Pretendard Bold"],
      PretendardExtraBold : ["PretendardExtraBold"],
      PretendardExtraLight : ["PretendardExtraLight"],
      PretendardLight : ["PretendardLight"],
      PretendardMedium : ["Pretendard Medium"],
      PretendardRegular : ["Pretendard Regular"],
      PretendardSemiBold : ["Pretendard SemiBold"],
      PretendardThin : ["Pretendard Thin"]
    },
    
  },
  variants: {},
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),

    require("tailwind-scrollbar-hide"),
  ],
};
