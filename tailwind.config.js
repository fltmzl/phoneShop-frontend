/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"]
      },
      colors: {
        lemon: {
          50: "#FCFFEB",
          100: "#F8FED2",
          200: "#F2FEA4",
          300: "#ECFD7C",
          400: "#E5FD4F",
          500: "#DFFC21",
          600: "#C5E203",
          700: "#95AB02",
          800: "#606F02",
          900: "#303701"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("@tailwindcss/line-clamp")
  ],
}
