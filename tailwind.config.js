/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        "logo-in": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "curtain-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(320%) skewX(-12deg)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1.14)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "logo-in": "logo-in 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "curtain-out": "curtain-out 0.6s ease-in forwards",
        "shine-sweep": "shine-sweep 1.4s ease-in-out 0.7s forwards",
        "kenburns": "kenburns 14s ease-out forwards",
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
