/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      rotate: {
        "y-180": "180deg",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".transform-style-preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    },
  ],
};
