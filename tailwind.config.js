/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yummy-red': '#8B1A1A',
        'yummy-red-dark': '#6B1414',
      }
    },
  },
  plugins: [],
}
