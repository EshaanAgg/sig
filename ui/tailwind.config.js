/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sigma: {
          blue: "#00bbe6",
          dark: "#12141c",
        },
      },
    },
  },
  plugins: [],
};
