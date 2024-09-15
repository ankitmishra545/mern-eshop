/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#BB1C6B",
        basic: "gray",
        danger: "red",
      },
    },
  },
  plugins: [],
};
