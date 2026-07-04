import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'

export function Footer({ language }: { language: Language }) {
  const { footer } = translations[language]

  return (
    <footer className="border-t border-brand-700/10 bg-[#F7FAF8] py-10 dark:border-green-400/10 dark:bg-[#080C0A]">
      <div className="container-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-2xl">
          <a href="#top" className="inline-flex items-center gap-3 font-display text-lg font-bold text-gray-900 dark:text-slate-50">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-700 text-xs text-white dark:bg-green-700">MV</span>
            Matheus Vaz
          </a>
          <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-slate-400">{footer.description}</p>
          <p className="mt-5 text-xs text-gray-400 dark:text-slate-500">
            © {new Date().getFullYear()} Matheus Henrique Vaz Marques. {footer.rights}
          </p>
        </div>
        <a href="#top" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-600 dark:text-green-400 dark:hover:text-green-300">
          {footer.backToTop}
          <Icon name="arrow" className="h-4 w-4 -rotate-90" />
        </a>
      </div>
    </footer>
  )
}
