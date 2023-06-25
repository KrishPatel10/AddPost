/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { colors: {
      "lightbg" : "#9FA7BF",
      "darkbg" : "#233855",
      "redd" : "#F24F54",
      "darkhover": "#7879F1",
    },
  },
  },
  plugins: [],
}

