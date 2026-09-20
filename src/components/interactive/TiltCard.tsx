import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { usePointerCapability } from '../../hooks/usePointerCapability'

const tagComponents = {
  div: motion.div,
  article: motion.article,
} as const

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  lift?: number
  glare?: boolean
  as?: keyof typeof tagComponents
}

export function TiltCard({ children, className, maxTilt = 7, lift = 6, glare = true, as = 'div' }: TiltCardProps) {
  const Wrapper = tagComponents[as]
  const { isTouch, canHover, prefersReducedMotion } = usePointerCapability()
  const disabled = isTouch || !canHover || prefersReducedMotion

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 250, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 250, damping: 22 })
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(300px circle at ${gx} ${gy}, rgba(var(--color-accent-rgb), 0.18), transparent 62%)`,
  )

  const Static = as
  if (disabled) {
    return <Static className={className}>{children}</Static>
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <Wrapper
      className={`relative ${className ?? ''}`}
      // transformPerspective is what makes rotateX/rotateY read as depth instead of a flat skew.
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -lift } }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBackground }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Wrapper>
  )
}
