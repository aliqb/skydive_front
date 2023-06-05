/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import * as flowbitPlugin from  "flowbite/plugin"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      colors: {
        primary: {
          ...colors.amber,
          DEFAULT: 'rgb(191 115 0)'
        }
      },
      boxShadow:{
        sideBar: '0 .5rem 1rem 0 rgba(44, 51, 73, .1)'
      }
      
    },
  },
  plugins: [
    flowbitPlugin
  ]
}

