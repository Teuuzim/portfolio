import { useEffect, useState } from 'react'
import type { Language } from '../hooks/useLanguage'
import type { Theme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { translations } from '../data/translations'

interface NavbarProps {
  language: Language
  theme: Theme
  onLanguageToggle: () => void
  onThemeToggle: () => void
}

export function Navbar({ language, theme, onLanguageToggle, onThemeToggle }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = translations[language]
  const links = [
    ['about', t.nav.about],
    ['skills', t.nav.skills],
    ['experience', t.nav.experience],
    ['automation', t.nav.automation],
    ['projects', t.nav.projects],
    ['education', t.nav.education],
    ['contact', t.nav.contact],
  ]

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-brand-700/10 bg-[#F7FAF8]/90 shadow-sm backdrop-blur-xl dark:border-green-400/10 dark:bg-[#080C0A]/90'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-shell flex h-20 items-center">
        <a href="#top" className="group flex items-center gap-3" aria-label="Matheus Vaz — home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 font-display text-sm font-extrabold text-white shadow-lg shadow-green-900/15 transition-transform group-hover:-translate-y-0.5 dark:bg-green-600">
            MV
          </span>
          <span className="hidden font-display text-sm font-bold tracking-tight text-gray-900 sm:block dark:text-slate-50">
            Matheus Vaz
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-0.5 xl:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 xl:ml-5">
          <button
            type="button"
            className="control-button min-w-12 px-3 text-xs font-bold"
            onClick={onLanguageToggle}
            aria-label={t.nav.language}
            title={t.nav.language}
          >
            {language === 'en' ? 'PT' : 'EN'}
          </button>
          <button
            type="button"
            className="control-button"
            onClick={onThemeToggle}
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
          <button
            type="button"
            className="control-button xl:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-brand-700/10 bg-[#F7FAF8]/98 transition-all duration-300 xl:hidden dark:border-green-400/10 dark:bg-[#080C0A]/98 ${
          open ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="container-shell flex flex-col py-4">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="border-b border-brand-700/10 py-4 text-base font-semibold text-gray-700 last:border-0 hover:text-brand-700 dark:border-green-400/10 dark:text-slate-200 dark:hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
