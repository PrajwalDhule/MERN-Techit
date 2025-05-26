/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js}"],
  theme: {
    extend: {
      colors: {
        'inner-border': 'rgba(117, 117, 117, 0.25)',
        'inner-border-2': 'rgba(117, 117, 117, 0.4)',
        'input-bg-light': '#8080802b',
        'input-bg-dark': '#8080802b'
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
