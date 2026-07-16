import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
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
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const desktopQuery = window.matchMedia('(min-width: 1280px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    desktopQuery.addEventListener('change', closeOnDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      desktopQuery.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-brand-700/10 bg-[#F4F8F5]/95 shadow-sm backdrop-blur dark:border-emerald-300/10 dark:bg-[#071510]/95'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-shell flex h-20 items-center">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 font-display text-sm font-bold tracking-tight text-gray-900 dark:text-slate-50"
          aria-label="Matheus Vaz — home"
        >
          <img
            src="/Teu.jpg"
            alt=""
            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md dark:border-slate-800"
          />
          <span className="hidden sm:inline">Matheus Vaz</span>
        </a>

        <div className="ml-auto hidden items-center gap-0.5 xl:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-5">
          <motion.button
            type="button"
            className="control-button min-w-12 px-3 text-xs font-bold"
            onClick={onLanguageToggle}
            whileTap={{ scale: 0.9 }}
            aria-label={t.nav.language}
            title={t.nav.language}
          >
            {language === 'en' ? 'PT' : 'EN'}
          </motion.button>
          <motion.button
            type="button"
            className="control-button"
            onClick={onThemeToggle}
            whileTap={{ scale: 0.9, rotate: -8 }}
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </motion.button>
          <motion.button
            type="button"
            className="control-button xl:hidden"
            onClick={() => setOpen((current) => !current)}
            whileTap={{ scale: 0.9 }}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="max-h-[calc(100dvh-5rem)] overflow-x-hidden overflow-y-auto overscroll-contain border-t border-brand-700/10 bg-[#F4F8F5] xl:hidden dark:border-emerald-300/10 dark:bg-[#071510]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-shell flex flex-col py-4">
              {links.map(([id, label], index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className="border-b border-brand-700/10 py-4 text-base font-semibold text-gray-700 last:border-0 hover:text-brand-700 dark:border-green-400/10 dark:text-slate-200 dark:hover:text-green-400"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
