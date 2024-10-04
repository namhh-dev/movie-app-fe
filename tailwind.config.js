const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      'mobile-ss' : '325px',
      'mobile-s': '376px',
      'mobile-m': '426px',
      'mobile-l': '490px',
      'mobile-xl': '550px',

      'tablet-s': '640px',
      'tablet-sm': '670px',
      'tablet-m': '769px',
      'tablet-l': '900px',
      'tablet-xl': '600px',

      'laptop-m': '980px',
      'laptop-l': '1025px',
      'laptop-xl': '1180px',

      'desktop': '1290px',
      'laptop-L': '1440px'
    },
  },
  plugins: []
})