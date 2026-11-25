import type { Language } from '../hooks/useLanguage'

/** Facts that are the same in every language. */
export const profile = {
  firstName: 'Matheus',
  name: 'Matheus Vaz',
  fullName: 'Matheus Henrique Vaz Marques',
  email: 'matheusvaz01@yahoo.com.br',
  github: 'https://github.com/Teuuzim',
  linkedin: 'https://linkedin.com/in/matheus-vaz-1a3a2021a',
  photo: '/Teu.jpg',
} as const

export const resumeHref = (language: Language) =>
  language === 'pt' ? '/Curriculo_Matheus_Vaz_PT.pdf' : '/resume.pdf'

/** The intro screen shown on load. Set `enabled: false` to drop it. */
export const splash = {
  enabled: true,
  durationMs: 1900,
} as const
