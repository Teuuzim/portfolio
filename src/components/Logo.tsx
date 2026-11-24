import { profile } from '../data/profile'

/** `< Matheus Vaz />`: the name as a signature between JSX brackets. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${className}`}>
      <span className="text-muted">&lt;</span>
      <span className="font-script text-[1.75em] leading-none text-accent dark:text-white">{profile.name}</span>
      <span className="text-muted">/&gt;</span>
    </span>
  )
}
