import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function About({ language }: { language: Language }) {
  const { about, focus } = translations[language]

  return (
    <>
      <section id="about" className="section-space scroll-mt-20">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <SectionHeading kicker={about.kicker} title={about.title} />
          <div className="space-y-5 text-base leading-8 text-gray-600 dark:text-slate-300">
            {about.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? 'text-lg font-semibold text-gray-800 dark:text-slate-100' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#EEF6F0] dark:bg-[#0E1511]">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading kicker={focus.kicker} title={focus.title} />
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-gray-600 dark:text-slate-300">
              {focus.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? 'text-lg font-semibold text-gray-800 dark:text-slate-100' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {focus.pillars.map((pillar, index) => (
              <div key={pillar.value} className="card flex items-center gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-700 text-white dark:bg-green-700">
                  <Icon name={index === 0 ? 'code' : index === 1 ? 'database' : 'spark'} />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold text-gray-900 dark:text-slate-50">{pillar.value}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{pillar.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
