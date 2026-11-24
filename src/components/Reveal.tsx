import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type From = 'bottom' | 'left' | 'right' | 'none'

const OFFSETS: Record<From, { x?: number; y?: number }> = {
  bottom: { y: 40 },
  left: { x: -48 },
  right: { x: 48 },
  none: {},
}

interface RevealProps {
  children: ReactNode
  from?: From
  delay?: number
  duration?: number
  className?: string
  /**
   * Plays when this turns true instead of on scroll-in. The hero uses it to
   * wait for the intro screen to leave.
   */
  when?: boolean
}

/** Fades content in, sliding from one side, the first time it scrolls into view. */
export function Reveal({ children, from = 'bottom', delay = 0, duration = 1, className, when }: RevealProps) {
  const hidden = { opacity: 0, ...OFFSETS[from] }
  const shown = { opacity: 1, x: 0, y: 0 }
  const transition = { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const }

  if (when !== undefined) {
    return (
      <motion.div className={className} initial={hidden} animate={when ? shown : hidden} transition={transition}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.15 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
