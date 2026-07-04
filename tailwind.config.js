/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF6F0',
          100: '#DCFCE7',
          500: '#16A34A',
          600: '#15803D',
          700: '#166534',
          900: '#0E3A20',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 50px -30px rgba(22, 101, 52, 0.35)',
        'card-dark': '0 18px 50px -30px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
