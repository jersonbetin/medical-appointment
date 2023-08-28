/** @type {import('tailwindcss').Config} */
// let paths = require('react-tailwindcss-datepicker/dist/index');
module.exports = {
  darkMode: '',
  purge: [
    // `${__dirname}/src/**/*.{js,ts,jsx,tsx,mdx}`,
    './src/**/*',
    './node_modules/react-tailwindcss-datepicker/**/*',
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0F8A75',
          secondary: '#d926a9',
          accent: '#1fb2a6',
          neutral: '#fffff',
          'base-100': '#1d232a',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
      'dracula',
      'cupcake',
      'light',
    ],
    base: true,
    utils: true,
    rtl: false,
    logs: true,
  },
  plugins: [require('daisyui')],
};
