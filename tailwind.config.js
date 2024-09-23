const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      'mobile-m': '420px',
      'mobile-l': '490px',

      'tablet-s': '640px',
      'tablet-m': '760px',
      'tablet-l': '900px',
      'tablet-xl': '600px',

      'laptop-m': '980px',
      'laptop-l': '1010px',
      'laptop-xl': '1180px',

      'desktop': '1290px',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
})