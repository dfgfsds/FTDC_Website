/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        squares: ['SquaresBold', 'sans-serif'], // Register the font
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};