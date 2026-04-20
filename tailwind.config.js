/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        alpine: {
          50: "#effbff",
          100: "#d9f2fb",
          200: "#b7e6f8",
          300: "#80d2f1",
          400: "#44bbe7",
          500: "#1f9ed2",
          600: "#1a80b2",
          700: "#1b668f",
          800: "#1f5575",
          900: "#1d495f",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
