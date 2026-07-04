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
        className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-green-600/10 blur-3xl dark:bg-green-500/10"
        animate={{ scale: [1, 1.16, 1], x: [0, 24, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-green-700/10 blur-3xl dark:bg-green-400/10"
        animate={{ scale: [1.12, 1, 1.12], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="container-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-16 py-20 lg:grid-cols-[1fr_0.7fr] lg:py-24">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }}
        >
          <motion.div variants={item} className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-700/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-sm backdrop-blur dark:border-green-400/15 dark:bg-[#121C16]/70 dark:text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {t.hero.eyebrow}
          </motion.div>
          <motion.p variants={item} className="mb-4 font-display text-lg font-bold text-brand-700 dark:text-green-400">
            Matheus Henrique Vaz Marques
          </motion.p>
          <motion.h1 variants={item} className="max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-slate-50">
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
            <a href="/resume.pdf" download className="button-secondary">
              <Icon name="download" className="h-4 w-4" />
              {t.hero.resumeButton}
            </a>
            <a target="_blank" href="https://linkedin.com/in/matheus-vaz-1a3a2021a" className="button-icon" aria-label="LinkedIn">
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
          className="relative mx-auto hidden w-full max-w-md lg:block"
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.25 }}
        >
          <div className="relative aspect-square">
            <img
              src="/Teu.jpg"
              alt="Matheus Vaz"
              className="absolute inset-[8%] h-[84%] w-[84%] rounded-[2.5rem] border border-brand-700/15 object-cover shadow-2xl shadow-green-900/20 dark:border-green-400/15"
            />
            <motion.div
              className="absolute left-0 top-[15%] rounded-2xl border border-brand-700/15 bg-white px-4 py-3 shadow-card dark:border-green-400/15 dark:bg-[#121C16]"
              animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <Icon name="code" className="h-6 w-6 text-brand-700 dark:text-green-400" />
            </motion.div>
            <motion.div
              className="absolute bottom-[12%] right-0 rounded-2xl border border-brand-700/15 bg-white px-4 py-3 shadow-card dark:border-green-400/15 dark:bg-[#121C16]"
              animate={{ y: [0, 9, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              aria-hidden="true"
            >
              <Icon name="workflow" className="h-6 w-6 text-brand-700 dark:text-green-400" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-[14%] rounded-full border border-brand-700/15 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-card dark:border-green-400/15 dark:bg-[#121C16] dark:text-slate-300"
             
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t.hero.available}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
