/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    fontFamily: {
      header: ["Tilt Prism"]
    },
    colors: {
      "purple": "#3A3042",
      "tangerine": "#DB9D47",
      "coral": "#FF784F",
      "sea": "#315964",
      "nyanza": "#EDFFD9",
      'white': '#ffffff',
      transparent: 'transparent',
    },
  },
  plugins: [require("daisyui")],
}
