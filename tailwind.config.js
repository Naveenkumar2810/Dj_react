/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
     'cus-white':'#f1f5f9',
     'card':'#fff'
      },
      boxShadow:{
        'card-hl': '0px 5px 15px rgba(0, 0, 0, 0.25)'
      },
      backdropBlur: {
        'signup':'10px'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

