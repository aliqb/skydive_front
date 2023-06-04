/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.amber,
          DEFAULT: 'rgb(191 115 0)'
        }
      },
    },
  },
  plugins: [
    import('flowbite/plugin')
  ]
}

