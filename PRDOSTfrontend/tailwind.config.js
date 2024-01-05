/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_color: "#f8f9fa",
        table_color: "#fdfffc",
        text_color: "#00aeef",
      },
      fontFamily: {
        textFont: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        site: "url('./assets/backgroundPR.jpg')",
        hint: "url('./assets/faq.png')",
      },
    },
  },
  plugins: [],
};
