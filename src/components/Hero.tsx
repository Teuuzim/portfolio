import { motion } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'

interface HeroProps {
  language: Language
}

export function Hero({ language }: HeroProps) {
  const t = translations[language]
  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="top" className="relative overflow-hidden pt-20">
      <div className="hero-grid absolute inset-0 opacity-50 dark:opacity-30" aria-hidden="true" />
      <motion.div
        className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-300/10"
        animate={{ scale: [1, 1.16, 1], x: [0, 24, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-green-400/10 blur-3xl dark:bg-emerald-500/10"
        animate={{ scale: [1.12, 1, 1.12], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="container-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1.08fr_0.72fr] lg:py-20">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }}
        >
          <motion.div variants={item} className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-700/15 bg-white/80 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700 shadow-sm backdrop-blur dark:border-emerald-300/15 dark:bg-[#0D211A]/80 dark:text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {t.hero.eyebrow}
          </motion.div>
          <motion.p variants={item} className="mb-4 font-mono text-sm font-semibold text-brand-700 dark:text-emerald-300">
            Matheus Henrique Vaz Marques
          </motion.p>
          <motion.h1 variants={item} className="max-w-4xl font-display text-4xl font-bold leading-[1.03] tracking-[-0.055em] text-[#153329] sm:text-5xl lg:text-6xl xl:text-[4.5rem] dark:text-slate-50">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-3xl text-lg font-medium leading-8 text-gray-700 sm:text-xl dark:text-slate-300">
            {t.hero.description}
          </motion.p>
          <motion.p variants={item} className="mt-4 max-w-3xl text-base leading-7 text-gray-500 sm:text-lg dark:text-slate-400">
            {t.hero.secondary}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="button-primary">
              {t.hero.projectsButton}
              <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a
              href={language === 'pt' ? '/Curriculo_Matheus_Vaz_PT.pdf' : '/resume.pdf'}
              download
              className="button-secondary"
            >
              <Icon name="download" className="h-4 w-4" />
              {t.hero.resumeButton}
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/matheus-vaz123" className="button-icon" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a
              href="https://github.com/Teuuzim"
              target="_blank"
              rel="noreferrer"
              className="button-icon"
              aria-label="GitHub"
            >
              <Icon name="github" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-md"
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.25 }}
        >
          <div className="identity-orbit relative aspect-square">
            <div className="absolute inset-[6%] rounded-full border border-brand-500/15 bg-white/55 shadow-card backdrop-blur dark:border-white/10 dark:bg-[#0D211A]/65" />
            <div className="absolute inset-[16%] rounded-full bg-brand-100 dark:bg-emerald-300/10" />
            <svg
              className="orbit-copy absolute inset-0 h-full w-full overflow-visible text-brand-700 dark:text-emerald-300"
              viewBox="0 0 400 400"
              aria-hidden="true"
            >
              <defs>
                <path id="identity-orbit-path" d="M 200,200 m -166,0 a 166,166 0 1,1 332,0 a 166,166 0 1,1 -332,0" />
              </defs>
              <text className="fill-current font-mono text-[13px] font-semibold uppercase tracking-[0.22em]">
                <textPath href="#identity-orbit-path" startOffset="0%">
                  {t.hero.orbit}
                </textPath>
              </text>
            </svg>
            <img
              src="/Teu.jpg"
              alt="Matheus Vaz"
              className="absolute inset-[20%] h-[60%] w-[60%] rounded-full border-4 border-white object-cover shadow-2xl shadow-emerald-950/25 dark:border-[#143328]"
            />
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand-700/15 bg-white/90 px-4 py-2 shadow-card backdrop-blur dark:border-emerald-300/15 dark:bg-[#0D211A]/90">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-700 dark:text-emerald-300 sm:text-[10px]">
                {t.hero.available} <span className="mx-1.5 text-slate-300 dark:text-slate-600">/</span> BH · BR
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
