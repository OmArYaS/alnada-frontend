/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#597445", // استخدام المتغير هنا
        secondary: "#D5F0C1",
        accent: "#f2e3e5",
      },
      fontFamily: {
        roboto: ["cairo", "sans-serif"],
        Shadows: ["cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
