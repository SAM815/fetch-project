/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        brand: "#FFB749",
        button: "#300D38",
        "button-hover": "#890075"
        // filterPink: "ED63CF",
        // generatematch: "31A835",
        // deletebutton: "F33144",
      },
    },
  },
  plugins: [],
}

