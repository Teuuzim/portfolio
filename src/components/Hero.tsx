import { motion } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { MagneticButton } from './interactive/MagneticButton'

interface HeroProps {
  language: Language
}

const EASE = [0.22, 1, 0.36, 1] as const

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
})

export function Hero({ language }: HeroProps) {
  const t = translations[language].hero

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-grid absolute inset-0 opacity-40 dark:opacity-25" aria-hidden="true" />

      <div className="container-shell relative grid min-h-[100svh] items-center gap-12 pb-16 pt-28 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="font-mono text-sm font-semibold text-brand-700 dark:text-emerald-300">{t.greeting}</p>
          <h1 className="mt-3 font-display text-display-2xl font-bold text-ink">Matheus Vaz</h1>

          <p className="mt-8 max-w-2xl font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-ink sm:text-3xl">
            {t.role}
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg dark:text-slate-300">
            {t.bio}
          </p>

          <motion.div {...rise(0.2)} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="#projects" className="button-primary">
              {t.projectsButton}
              <Icon name="arrow" className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href={language === 'pt' ? '/Curriculo_Matheus_Vaz_PT.pdf' : '/resume.pdf'}
              download
              className="button-secondary"
            >
              <Icon name="download" className="h-4 w-4" />
              {t.resumeButton}
            </MagneticButton>
            <MagneticButton
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/matheus-vaz123"
              className="button-icon"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" />
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Teuuzim"
              target="_blank"
              rel="noreferrer"
              className="button-icon"
              aria-label="GitHub"
            >
              <Icon name="github" />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.figure {...rise(0.1)} className="relative order-1 w-44 sm:w-56 lg:order-2 lg:w-80">
          <img
            src="/Teu.jpg"
            alt="Matheus Vaz"
            width={424}
            height={424}
            fetchPriority="high"
            className="aspect-square w-full rounded-full object-cover ring-1 ring-brand-700/15 ring-offset-8 ring-offset-canvas dark:ring-emerald-300/20"
          />
          <figcaption className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-brand-700/15 bg-canvas px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-700 shadow-sm lg:-bottom-3 lg:px-4 lg:py-2 lg:text-[11px] dark:border-emerald-300/15 dark:text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {t.status}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
