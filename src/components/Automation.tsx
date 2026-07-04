import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Automation({ language }: { language: Language }) {
  const { automation } = translations[language]

  return (
    <section id="automation" className="section-space scroll-mt-20 overflow-hidden">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-700/15 bg-brand-700 px-6 py-10 text-white shadow-2xl shadow-green-900/15 sm:px-10 lg:px-14 lg:py-16 dark:border-green-400/15 dark:bg-[#121C16]">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-white/5" aria-hidden="true" />
          <div className="absolute -bottom-36 -left-36 h-96 w-96 rounded-full border-[64px] border-white/5" aria-hidden="true" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div className="[&_.section-kicker]:text-green-200 [&_.section-title]:text-white">
                <SectionHeading kicker={automation.kicker} title={automation.title} />
              </div>
              <div className="mt-8 space-y-5 leading-8 text-green-50/80 dark:text-slate-300">
                {automation.paragraphs.map((paragraph, index) => (
                  <p key={paragraph} className={index === 0 ? 'text-lg font-semibold text-white' : ''}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {automation.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm dark:bg-white/[0.04]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-green-300/15 text-green-200 dark:text-green-400">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium leading-6 text-white/90 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
