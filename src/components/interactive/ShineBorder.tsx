/**
 * Shine Border, adapted from Magic UI (via 21st.dev).
 * Original: Dillion Verma, https://github.com/magicuidesign/magicui
 * License: MIT
 *
 * Changes from the original: no `cn` helper, always aria-hidden, and the
 * default colors follow the brand emerald and the theme's accent variable.
 *
 * The host needs `position: relative` and a border radius; render this as its
 * last child so sibling backgrounds don't paint over it.
 */
import type { CSSProperties } from 'react'

const BRAND_SHINE = ['rgb(52 211 153)', 'rgba(var(--color-accent-rgb), 1)', 'rgb(22 132 91)']

interface ShineBorderProps {
  /** Border thickness in px. */
  borderWidth?: number
  /** Seconds for one full sweep. */
  duration?: number
  shineColor?: string | string[]
  className?: string
}

export function ShineBorder({ borderWidth = 1, duration = 14, shineColor = BRAND_SHINE, className = '' }: ShineBorderProps) {
  const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor

  return (
    <div
      aria-hidden="true"
      style={
        {
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: `${borderWidth}px`,
        } as CSSProperties
      }
      className={`pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine ${className}`}
    />
  )
}
