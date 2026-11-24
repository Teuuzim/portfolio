import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

/*
 * Scroll-drawn timeline, rebuilt after the scroll timelines on 21st.dev
 * (Aceternity's "Timeline" by Manu Arora and ibrandify's "Scroll animated
 * timeline"). The beam and every dot key off the same line, the vertical
 * middle of the viewport, so a dot lights up exactly as the beam's tip
 * reaches it.
 */
const TRACK_OFFSET = ['start 50%', 'end 50%'] as const
const SPRING = { stiffness: 140, damping: 30, mass: 0.3, restDelta: 0.001 }

function TimelineBeam() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: [...TRACK_OFFSET] })
  const progress = useSpring(scrollYProgress, SPRING)
  const tipTop = useTransform(progress, (value) => `${value * 100}%`)
  const visible = useTransform(progress, [0, 0.02], [0, 1])

  return (
    <div
      ref={trackRef}
      className="absolute bottom-5 left-[19px] top-5 w-px bg-brand-700/15 md:left-1/2 dark:bg-emerald-300/10"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-y-0 -left-px w-[3px] origin-top rounded-full bg-gradient-to-b from-transparent via-brand-500 to-accent-500 dark:via-emerald-300 dark:to-accent-300"
        style={{ scaleY: progress, opacity: visible }}
      />
      <motion.span
        className="absolute left-1/2 h-3 w-3 rounded-full bg-accent-500 shadow-[0_0_0_4px_rgba(var(--color-accent-rgb),0.18),0_0_22px_6px_rgba(var(--color-accent-rgb),0.55)] dark:bg-accent-300"
        style={{ top: tipTop, x: '-50%', y: '-50%', opacity: visible }}
      />
    </div>
  )
}

function TimelineDot({ side }: { side: 'left' | 'right' }) {
  const dotRef = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: dotRef, offset: [...TRACK_OFFSET] })
  const lit = useSpring(scrollYProgress, SPRING)
  const scale = useTransform(lit, [0, 1], [0.55, 1])

  return (
    <span
      ref={dotRef}
      className={`absolute left-2.5 top-7 z-10 h-5 w-5 rounded-full bg-panel md:left-auto ${
        side === 'left' ? 'md:-right-2.5' : 'md:-left-2.5'
      }`}
      aria-hidden="true"
    >
      <span className="absolute inset-1 rounded-full bg-brand-700/25 dark:bg-emerald-300/20" />
      <motion.span
        className="absolute inset-1 rounded-full bg-brand-700 shadow-[0_0_0_4px_rgba(22,132,91,0.16),0_0_18px_4px_rgba(52,211,153,0.5)] dark:bg-emerald-300"
        style={{ opacity: lit, scale }}
      />
    </span>
  )
}

export function Experience({ language }: { language: Language }) {
  const { experience, labels } = translations[language]
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="section-space scroll-mt-20 bg-panel">
      <div className="container-shell">
        <SectionHeading
          kicker={experience.kicker}
          title={experience.title}
          subtitle={experience.subtitle}
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          <TimelineBeam />
          <div className="space-y-10 md:space-y-14">
            {experience.items.map((item, index) => {
              const isExpanded = expanded === index
              return (
                <motion.article
                  key={`${item.company}-${item.role}`}
                  className={`relative pl-14 md:w-1/2 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TimelineDot side={index % 2 === 0 ? 'left' : 'right'} />
                  <div className="card overflow-hidden p-6 sm:p-7">
                    <div className="flex flex-wrap items-start gap-4">
                      <span className="icon-box">
                        <Icon name="briefcase" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-green-400">
                          {item.period}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-bold text-gray-900 dark:text-slate-50">
                          {item.role}
                        </h3>
                        <p className="mt-1 font-semibold text-gray-700 dark:text-slate-200">{item.company}</p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400">
                          <Icon name="map" className="h-4 w-4" />
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                      {item.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>

                    <button
                      type="button"
                      className="mt-6 flex w-full items-center gap-2 border-t border-brand-700/10 pt-5 text-left text-sm font-bold text-brand-700 dark:border-green-400/10 dark:text-green-400"
                      onClick={() => setExpanded(isExpanded ? null : index)}
                      aria-expanded={isExpanded}
                    >
                      {labels.activities}
                      <Icon
                        name="chevron"
                        className={`ml-auto h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ul className="space-y-3 pt-5">
                            {item.activities.map((activity) => (
                              <li key={activity} className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
