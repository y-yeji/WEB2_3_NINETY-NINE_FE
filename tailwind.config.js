/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          5: "#F4F5F6",
          10: "#E6E8EA",
          20: "#CDD1D5",
          30: "#B1B8BE",
          40: "#8A949E",
          50: "#6D7882",
          50: "#6D7882",
          60: "#58616A",
          70: "#464C53",
          80: "#33363D",
          90: "#1E2124",
          95: "#131416",
          100: "#1A1A1A",
        },
        blue: {
          1: "#203349",
          2: "#2C4764",
          3: "#385A7F",
          4: "#4A77A8",
          5: "#608BB9",
          6: "#7B9FC5",
          7: "#A4BDD7",
        },
        base: {
          1: "#F9F9F9",
          2: "#FDFAF3",
        },
        red: {
          error: "#DE3412",
        },
      },
      fontFamily: {
        dm: ["DM Serif Text", "serif"],
        pretendard: ["Pretendard Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
