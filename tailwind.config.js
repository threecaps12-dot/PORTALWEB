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
        "draw": {
          "0%": { "stroke-dashoffset": "1" },
          "100%": { "stroke-dashoffset": "0" },
        },
        "badge-pop": {
          "0%": { opacity: "0", transform: "scale(0.82)" },
          "65%": { opacity: "1", transform: "scale(1.06)" },
          "100%": { opacity: "1", transform: "scale(1)" },
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
        "spray-reveal": {
          "0%": { "clip-path": "inset(0 100% 0 0)" },
          "100%": { "clip-path": "inset(0 0% 0 0)" },
        },
        "spray-glow-move": {
          "0%": { left: "-6%", opacity: "0" },
          "10%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { left: "104%", opacity: "0" },
        },
        "ember-float": {
          "0%": { transform: "translateY(0) scale(0.4)", opacity: "0" },
          "12%": { opacity: "1", transform: "translateY(-8vh) scale(1)" },
          "75%": { opacity: "0.9" },
          "100%": { transform: "translateY(-95vh) scale(0.3)", opacity: "0" },
        },
        "flame-flicker": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "25%": { opacity: "0.8", transform: "scale(1.05)" },
          "50%": { opacity: "0.6", transform: "scale(0.97)" },
          "75%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "aurora-drift-1": {
          "0%, 100%": { transform: "translate(-10%, -10%) scale(1)" },
          "50%": { transform: "translate(10%, 5%) scale(1.15)" },
        },
        "aurora-drift-2": {
          "0%, 100%": { transform: "translate(8%, 10%) scale(1.1)" },
          "50%": { transform: "translate(-8%, -8%) scale(0.95)" },
        },
        "aurora-drift-3": {
          "0%, 100%": { transform: "translate(-5%, 8%) scale(0.9)" },
          "50%": { transform: "translate(6%, -10%) scale(1.1)" },
        },
      },
      animation: {
        "draw": "draw 0.85s cubic-bezier(0.65,0,0.35,1) forwards",
        "badge-pop": "badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "shine-sweep": "shine-sweep 1.2s ease-in-out 0.35s forwards",
        "kenburns": "kenburns 14s ease-out forwards",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "spray-reveal": "spray-reveal 950ms cubic-bezier(0.45,0,0.4,1) forwards",
        "spray-glow-move": "spray-glow-move 950ms cubic-bezier(0.45,0,0.4,1) forwards",
        "ember-float": "ember-float 2400ms ease-in forwards",
        "flame-flicker": "flame-flicker 1.4s ease-in-out infinite",
        "aurora-drift-1": "aurora-drift-1 14s ease-in-out infinite",
        "aurora-drift-2": "aurora-drift-2 18s ease-in-out infinite",
        "aurora-drift-3": "aurora-drift-3 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
