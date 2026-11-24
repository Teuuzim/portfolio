import { useEffect, useState } from 'react'
import type { Language } from '../hooks/useLanguage'
import type { Theme } from '../hooks/useTheme'
import { translations } from '../data/translations'
import { resumeHref } from '../data/profile'
import { Icon } from './Icon'
import { Logo } from './Logo'

interface HeaderProps {
  language: Language
  theme: Theme
  onLanguageToggle: () => void
  onThemeToggle: () => void
}

/** Hides while scrolling down, comes back as soon as the reader scrolls up. */
function useHideOnScroll(threshold = 120) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        if (Math.abs(y - last) < 6) return
        setHidden(y > last && y > threshold)
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return hidden
}

function ThemeSwitch({ theme, label, onToggle }: { theme: Theme; label: string; onToggle: () => void }) {
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-7 w-14 shrink-0 rounded-full transition-colors duration-300 ${dark ? 'bg-[#2196f3]' : 'bg-[#ccd1d6]'}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-white text-sm shadow transition-transform duration-300 ${
          dark ? 'translate-x-7' : 'translate-x-0'
        }`}
        aria-hidden="true"
      >
        {dark ? '🌜' : '🌞'}
      </span>
    </button>
  )
}

export function Header({ language, theme, onLanguageToggle, onThemeToggle }: HeaderProps) {
  const t = translations[language].nav
  const [open, setOpen] = useState(false)
  const hidden = useHideOnScroll()

  const links = [
    { href: '#skills', label: t.skills },
    { href: '#education', label: t.education },
    { href: '#experience', label: t.experience },
    { href: '#projects', label: t.projects },
    { href: resumeHref(language), label: t.resume, download: true },
    { href: '#contact', label: t.contact },
  ]

  return (
    <header
      className={`sticky top-0 z-50 bg-bg transition-transform duration-300 ${hidden && !open ? '-translate-y-full' : ''}`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6 sm:h-24">
        <a href="#top" className="text-xl sm:text-2xl" aria-label="Matheus Vaz">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download || undefined}
              className="rounded px-3 py-2 text-[17px] text-fg transition-colors hover:bg-line/60 xl:px-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLanguageToggle}
            aria-label={t.language}
            className="rounded border border-line px-2.5 py-1 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent dark:hover:border-accent-soft dark:hover:text-accent-soft"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
          <ThemeSwitch theme={theme} label={t.theme} onToggle={onThemeToggle} />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded text-fg lg:hidden"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-line bg-bg lg:hidden">
          <ul className="shell py-2">
            {links.map((link) => (
              <li key={link.label} className="border-b border-line last:border-b-0">
                <a
                  href={link.href}
                  download={link.download || undefined}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-lg text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
