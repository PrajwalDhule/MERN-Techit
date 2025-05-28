/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js}"],
  theme: {
    extend: {
      colors: {
        'inner-border': 'rgba(117, 117, 117, 0.25)',
        'inner-border-2': 'rgba(117, 117, 117, 0.4)',
        'input-bg': '#8080802b',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
