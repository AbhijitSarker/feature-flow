/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F7A582',
        secondary: '#F7A582',
        headingText: '#0A0808',
        paragraphText: '#3B3A3A',
        cardText: '#6C6B6B',
        input: '#FFFFFF0D'
      }
    },
  },
  plugins: [],
}

