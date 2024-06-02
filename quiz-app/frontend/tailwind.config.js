/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer"),require('daisyui')],
};
