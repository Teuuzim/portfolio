/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EDF8F1',
          100: '#D5F0DF',
          500: '#16845B',
          600: '#11704D',
          700: '#0C5C42',
          900: '#073B2D',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 22px 60px -36px rgba(7, 59, 45, 0.38)',
        'card-dark': '0 18px 50px -30px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
