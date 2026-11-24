import { profile } from '../data/profile'
import { Icon } from './Icon'

const LINKS = [
  { label: 'GitHub', href: profile.github, icon: 'github', color: '#333333' },
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin', color: '#0e76a8' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail', color: '#ea4335' },
] as const

/** Round brand-colored links to GitHub, LinkedIn and email. */
export function SocialMedia({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={link.label}
            title={link.label}
            className="grid h-11 w-11 place-items-center rounded-full text-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: link.color }}
          >
            <Icon name={link.icon} className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
