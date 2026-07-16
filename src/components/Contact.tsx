import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'

export function Contact({ language }: { language: Language }) {
  const { contact, labels } = translations[language]
  const contacts = [
    { label: labels.email, value: 'matheusvaz01@yahoo.com.br', href: 'mailto:matheusvaz01@yahoo.com.br', icon: 'mail' as const },
    { label: labels.github, value: '@Teuuzim', href: 'https://github.com/Teuuzim', icon: 'github' as const },
    { label: labels.linkedin, value: 'Matheus Vaz', href: 'https://linkedin.com/in/matheus-vaz-1a3a2021a', icon: 'linkedin' as const },
  ]

  return (
    <section id="contact" className="section-space scroll-mt-20 bg-[#E7F2EA] dark:bg-[#091B15]">
      <div className="container-shell">
        <div className="grid overflow-hidden rounded-[2rem] border border-brand-700/15 bg-white shadow-card lg:grid-cols-[0.9fr_1.1fr] dark:border-green-400/15 dark:bg-[#121C16] dark:shadow-card-dark">
          <div className="bg-[#073B2D] p-8 text-white sm:p-10 lg:p-12 dark:bg-[#062A20]">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">{contact.kicker}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{contact.title}</h2>
            <div className="mt-6 space-y-4 leading-7 text-green-50/80">
              {contact.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-9 flex items-start gap-3 border-t border-white/15 pt-7 text-sm text-green-50/90">
              <Icon name="map" className="mt-0.5 h-5 w-5 shrink-0 text-green-200" />
              <div>
                <p className="font-semibold text-white">{labels.location}</p>
                <p className="mt-1">{contact.location}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:p-10 lg:p-12">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex min-w-0 items-center gap-4 rounded-2xl border border-brand-700/10 bg-[#F7FAF8] p-5 transition-all hover:-translate-y-0.5 hover:border-brand-700/30 hover:shadow-card dark:border-green-400/10 dark:bg-[#0E1511] dark:hover:border-green-400/30"
              >
                <span className="icon-box shrink-0"><Icon name={item.icon} /></span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">{item.label}</span>
                  <span className="mt-1 block truncate text-sm font-semibold text-gray-800 sm:text-base dark:text-slate-100">{item.value}</span>
                </span>
                <Icon name="external" className="ml-auto h-4 w-4 shrink-0 text-brand-700 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-green-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
