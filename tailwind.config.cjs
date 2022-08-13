/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      // => @media (min-width: 480px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      "md-s": "850px",
      // => @media (min-width: 768px) { ... }

      "md-x": "1024px",
      // => @media (min-width: 1024px) { ... }

      lg: "1150px",
      // => @media (min-width: 1024px) { ... }

      xl: "1700px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        primary: "#1cb803",
        // primary: "#2E48DA",
      },
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
