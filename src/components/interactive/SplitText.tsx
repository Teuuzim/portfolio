import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

type SplitTextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface SplitTextProps {
  children: string
  as?: SplitTextTag
  className?: string
  by?: 'word' | 'char'
  stagger?: number
  delay?: number
  /** 'inView' reveals on scroll; 'mount' plays immediately (above-the-fold copy). */
  trigger?: 'inView' | 'mount'
}

export function SplitText({
  children,
  as: Tag = 'span',
  className,
  by = 'word',
  stagger = 0.035,
  delay = 0,
  trigger = 'inView',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const show = trigger === 'mount' || inView

  const units = by === 'char' ? children.split('') : children.split(/(\s+)/)

  // Blur is a per-element GPU cost, so it only rides along on word reveals,
  // where the element count stays small.
  const blur = by === 'word'
  const hidden = { opacity: 0, y: '0.55em', ...(blur ? { filter: 'blur(6px)' } : {}) }
  const visible = { opacity: 1, y: '0em', ...(blur ? { filter: 'blur(0px)' } : {}) }

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          className="inline-block"
          style={{ whiteSpace: unit.trim() === '' ? 'pre' : undefined }}
          initial={hidden}
          animate={show ? visible : hidden}
          transition={{ duration: 0.55, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {unit}
        </motion.span>
      ))}
    </Tag>
  )
}
