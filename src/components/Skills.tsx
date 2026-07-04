import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Skills({ language }: { language: Language }) {
  const { skills } = translations[language]

  return (
    <section id="skills" className="section-space scroll-mt-20">
      <div className="container-shell">
        <SectionHeading kicker={skills.kicker} title={skills.title} subtitle={skills.subtitle} align="center" />
        <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group) => (
            <article key={group.title} className="card h-full p-7">
              <span className="icon-box">
                <Icon name={group.icon} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600 dark:bg-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
