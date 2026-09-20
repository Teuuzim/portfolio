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
        accent: {
          50: '#FDF3E9',
          100: '#FBE3C8',
          300: '#F3B571',
          500: '#E8873A',
          600: '#D06E24',
          700: '#A9551A',
        },
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        surface: 'rgb(var(--color-card) / <alpha-value>)',
        deep: 'rgb(var(--color-deep) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 1.6rem + 4.2vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
      },
      boxShadow: {
        card: '0 22px 60px -36px rgba(7, 59, 45, 0.38)',
        'card-dark': '0 18px 50px -30px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
