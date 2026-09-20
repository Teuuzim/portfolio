import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePointerCapability } from '../../hooks/usePointerCapability'

const INTERACTIVE = 'a, button, [data-cursor]'

export function CustomCursor() {
  const { isTouch, canHover, prefersReducedMotion } = usePointerCapability()
  const active = !isTouch && canHover && !prefersReducedMotion

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 })
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (!active) return

    document.body.classList.add('has-custom-cursor')

    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const over = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(INTERACTIVE)) setHovering(true)
    }
    const out = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(INTERACTIVE)) setHovering(false)
    }
    const leaveWindow = () => setVisible(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    document.addEventListener('pointerleave', leaveWindow)
    window.addEventListener('blur', leaveWindow)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      document.removeEventListener('pointerleave', leaveWindow)
      window.removeEventListener('blur', leaveWindow)
    }
  }, [active, x, y])

  if (!active) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-700/40 dark:border-emerald-300/40"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.5 : 1,
          backgroundColor: hovering ? 'rgba(var(--color-accent-rgb), 0.14)' : 'rgba(var(--color-accent-rgb), 0)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      />
    </>
  )
}
