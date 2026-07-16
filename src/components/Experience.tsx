import { useState } from 'react'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Experience({ language }: { language: Language }) {
  const { experience, labels } = translations[language]
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="section-space scroll-mt-20 bg-[#E7F2EA] dark:bg-[#091B15]">
      <div className="container-shell">
        <SectionHeading
          kicker={experience.kicker}
          title={experience.title}
          subtitle={experience.subtitle}
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute bottom-5 left-[19px] top-5 w-px bg-brand-700/25 md:left-1/2 dark:bg-emerald-300/20" aria-hidden="true" />
          <div className="space-y-10 md:space-y-14">
            {experience.items.map((item, index) => {
              const isExpanded = expanded === index
              return (
                <article
                  key={`${item.company}-${item.role}`}
                  className={`relative pl-14 md:w-1/2 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <span
                    className={`absolute left-2.5 top-7 z-10 grid h-5 w-5 place-items-center rounded-full border-4 border-[#E7F2EA] bg-brand-700 md:left-auto dark:border-[#091B15] dark:bg-emerald-300 ${
                      index % 2 === 0 ? 'md:-right-2.5' : 'md:-left-2.5'
                    }`}
                    aria-hidden="true"
                  />
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
                    <div className={`grid transition-[grid-template-rows] duration-300 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <ul className="space-y-3 pt-5">
                          {item.activities.map((activity) => (
                            <li key={activity} className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
