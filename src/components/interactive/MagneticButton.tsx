import type { ReactNode } from 'react'
import type { HTMLMotionProps } from 'motion/react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePointerCapability } from '../../hooks/usePointerCapability'

interface MagneticButtonProps extends Omit<HTMLMotionProps<'a'>, 'className' | 'style'> {
  children: ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({ children, strength = 0.35, className, ...rest }: MagneticButtonProps) {
  const { isTouch, canHover, prefersReducedMotion } = usePointerCapability()
  const disabled = isTouch || !canHover || prefersReducedMotion

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (disabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      className={className}
      style={disabled ? undefined : { x: springX, y: springY }}
      onPointerMove={disabled ? undefined : handlePointerMove}
      onPointerLeave={disabled ? undefined : handlePointerLeave}
      {...rest}
    >
      {children}
    </motion.a>
  )
}
