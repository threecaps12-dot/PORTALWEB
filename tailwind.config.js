/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0D0D0D",
          soft: "#1A1A1A",
        },
        crimson: {
          DEFAULT: "#8C0B1E",
          hover: "#6E0918",
        },
        gold: "#D4AF37",
        cream: "#FAF8F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        "spray-in": {
          "0%": { opacity: "0", filter: "blur(10px) brightness(0.7)", transform: "scale(0.9)" },
          "60%": { opacity: "1", filter: "blur(1px) brightness(1)" },
          "100%": { opacity: "1", filter: "blur(0) brightness(1)", transform: "scale(1)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
      },
      animation: {
        "spray-in": "spray-in 1.1s ease-out forwards",
        "fade-out": "fade-out 0.6s ease-in forwards",
      },
    },
  },
  plugins: [],
};
