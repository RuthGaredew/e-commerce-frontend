/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all files in your src folder
  ],
  darkMode: "class", // Critical for your state.darkMode logic to work!
  theme: {
    extend: {},
  },
  plugins: [],
};
