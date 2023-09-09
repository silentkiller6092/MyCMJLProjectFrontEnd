/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: "#121212",
        productbg:"#F3F2ED",
        textColor: "#e5e4e2",
        onhover:"#1c263a",
        textcolors:"#63aaff",
        background:"#0000003d",
      },
      fontFamily:{
navbar:['Nunito', 'sans-serif'],
trusted:['Sofia', 'cursive'],
buttons:['Open Sans', 'sans-serif'],
desc:['Roboto', 'sans-serif'],
heading:['Armio', 'sans-serif'],
      },
     
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
      },
    },
  },
  plugins: [],
}