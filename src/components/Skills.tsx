import type { SimpleIcon } from 'simple-icons'
import {
  siCss,
  siExpress,
  siGit,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siReact,
  siTailwindcss,
} from 'simple-icons'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import buildingIllustration from '../assets/illustrations/building-a-website.svg'
import buildingIllustrationDark from '../assets/illustrations/building-a-website-dark.svg'
import { Illustration } from './Illustration'
import { Reveal } from './Reveal'

const STACK: { label: string; icon: SimpleIcon }[] = [
  { label: 'react', icon: siReact },
  { label: 'next.js', icon: siNextdotjs },
  { label: 'javascript', icon: siJavascript },
  { label: 'html-5', icon: siHtml5 },
  { label: 'css', icon: siCss },
  { label: 'tailwind', icon: siTailwindcss },
  { label: 'node.js', icon: siNodedotjs },
  { label: 'express', icon: siExpress },
  { label: 'php', icon: siPhp },
  { label: 'laravel', icon: siLaravel },
  { label: 'mysql', icon: siMysql },
  { label: 'git', icon: siGit },
]

/** Near-black brand colors would vanish on the dark theme, so those follow the text color instead. */
function hoverColor(hex: string) {
  const value = parseInt(hex, 16)
  const luminance = (0.299 * (value >> 16) + 0.587 * ((value >> 8) & 255) + 0.114 * (value & 255)) / 255
  return luminance < 0.2 ? 'rgb(var(--color-fg))' : `#${hex}`
}

export function Skills({ language }: { language: Language }) {
  const { skills } = translations[language]

  return (
    <section id="skills" className="shell section grid items-center gap-12 lg:grid-cols-2">
      <Reveal from="left" className="order-2 lg:order-1">
        <Illustration
          light={buildingIllustration}
          dark={buildingIllustrationDark}
          width={702}
          height={680}
          className="mx-auto w-full max-w-[480px]"
        />
      </Reveal>

      <Reveal from="right" className="order-1 lg:order-2">
        <h2 className="section-title">{skills.whatIDo}</h2>
        <p className="section-subtitle">{skills.title}</p>

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-4" aria-label={skills.kicker}>
          {STACK.map(({ label, icon }) => (
            <li
              key={label}
              className="group flex w-14 flex-col items-center gap-1.5 text-muted transition-colors duration-200"
              style={{ '--brand': hoverColor(icon.hex) } as React.CSSProperties}
            >
              <svg
                role="img"
                aria-label={icon.title}
                viewBox="0 0 24 24"
                className="h-10 w-10 fill-current transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:text-[var(--brand)]"
              >
                <path d={icon.path} />
              </svg>
              <span className="text-[11px] leading-none" aria-hidden="true">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <ul className="mt-10 space-y-4">
          {skills.groups.map((group) => (
            <li key={group.title} className="text-lg leading-snug text-muted">
              <span aria-hidden="true">⚡ </span>
              <span className="font-semibold text-fg">{group.title}:</span> {group.items.join(', ')}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
