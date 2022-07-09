/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {

      animation: {
        blob: "bolb 7s infinite",
      },

      keyframes:{
        bolb: {
          "0%":{
            transform: "scale(1) translate(0px,0px)",
          },
          "33%":{
            transform: "scale(1.05) translate(20px,-20px)",
          },
          "66%":{
            transform: "scale(0.95) translate(-20px,20px)",
          },
          "100%":{
            transform: "scale(1) translate(0px,0px)",
          }
        }
      },

    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
