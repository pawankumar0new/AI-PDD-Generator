/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fsSlideIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-bounce": {
          "0%, 80%, 100%": { transform: "scale(0.7)", opacity: "0.5" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fs-slide-in": "fsSlideIn 0.3s ease",
        "slide-down": "slideDown 0.18s ease",
        "fade-in": "fadeIn 0.25s ease",
        "pulse-bounce": "pulse-bounce 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};