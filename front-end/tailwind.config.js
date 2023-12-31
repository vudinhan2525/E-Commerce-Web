/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#003E29',
      },
      fontFamily: {
        OpenSans: ['"Open Sans"', 'sans-serif'],
      },
      keyframes: {
        slideRightIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        scaleIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideTopDown: {
          '0%': { transform: 'translateY(-100)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
      },
      animation: {
        slideRightIn: 'slideRightIn 1s ease-in-out',
        fadeOut: 'fadeOut 1s linear',
        scaleIn: 'scaleIn 0.2s linear',
        slideTopDown: 'slideTopDown 0.2s linear',
      },
    },
  },
  plugins: [],
});
