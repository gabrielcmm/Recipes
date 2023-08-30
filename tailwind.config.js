/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'light-100': '#FF5722',
          'light-200': '#ff8a50',
          'light-300': '#fff3b0',
          'dark-100': '#FF6F00',
          'dark-200': '#dc5200',
          'dark-300': '#8d0000',
          'button': '#4A7530', // coloquei aqui pq ainda não temos tema definido
        },
        accent: {
          'light-100': '#FFC107',
          'light-200': '#916400',
          'dark-100': '#FF4081',
          'dark-200': '#ffe4ff',
        },
        text: {
          'light-100': '#333333',
          'light-200': '#5c5c5c',
          'dark-100': '#FFFFFF',
          'dark-200': '#e0e0e0',
        },
        bg: {
          'light-100': '#F5F5F5',
          'light-200': '#ebebeb',
          'light-300': '#c2c2c2',
          'dark-100': '#1A1A1A',
          'dark-200': '#292929',
          'dark-300': '#404040',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}