/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Every color is a CSS variable (see index.css), so the theme toggle and
        // a future palette change both happen in one place.
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['"Herr Von Muellerhoff"', 'cursive'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.18)',
        'card-hover': '0 20px 40px -14px rgba(0, 0, 0, 0.28)',
      },
      keyframes: {
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        wave: 'wave 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
