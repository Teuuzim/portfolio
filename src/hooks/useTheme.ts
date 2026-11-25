import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

export function useTheme() {
  // index.html already applied the saved (or system) theme before first
  // paint, so the class on <html> is the source of truth at startup.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#171c28' : '#ffffff',
    )
  }, [theme])

  const toggleTheme = () =>
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })

  return { theme, toggleTheme }
}
