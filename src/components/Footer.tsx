import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { profile } from '../data/profile'

export function Footer({ language }: { language: Language }) {
  const { footer } = translations[language]

  return (
    <footer className="shell py-10 text-center text-muted">
      <p>
        © {new Date().getFullYear()} {profile.fullName}. {footer.rights}
      </p>
      <p className="mt-3 text-sm">
        {footer.credit}{' '}
        <a
          href="https://github.com/saadpasta/developerFolio"
          target="_blank"
          rel="noreferrer"
          className="text-accent underline underline-offset-2 dark:text-accent-soft"
        >
          developerFolio
        </a>
      </p>
    </footer>
  )
}
