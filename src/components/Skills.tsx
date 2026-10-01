import { motion } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './interactive/TiltCard'

export function Skills({ language }: { language: Language }) {
  const { skills } = translations[language]

  return (
    <section id="skills" className="section-space scroll-mt-20 overflow-hidden">
      <div className="container-shell">
        <SectionHeading kicker={skills.kicker} title={skills.title} subtitle={skills.subtitle} align="center" />
        <div className="mt-14 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="card h-full p-7" maxTilt={4}>
                <span className="icon-box">
                  <Icon name={group.icon} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500 dark:bg-emerald-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
