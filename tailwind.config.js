/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#07332F',
        secondary: '#F7A582',
        background: '#F4F4F4',
        headingText: '#0A0808',
        paragraphText: '#3B3A3A',
        cardText: '#6C6B6B',
        input: '#FFFFFF0D'
      },
      fontFamily: {
        baskerville: ['Libre Baskerville', 'serif']
      }
    },
  },
  plugins: [],
}

