import { useEffect, useState } from 'react'

export type Language = 'en' | 'pt'

const STORAGE_KEY = 'portfolio-language'

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'pt' ? 'pt' : 'en'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const toggleLanguage = () => setLanguage((current) => (current === 'en' ? 'pt' : 'en'))

  return { language, toggleLanguage }
}
