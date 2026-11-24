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
  /** Gradient border that follows the cursor. */
  glow?: boolean
  as?: keyof typeof tagComponents
}

// The cursor-following border is adapted from Magic UI's Magic Card (via
// 21st.dev). Original: Dillion Verma, https://github.com/magicuidesign/magicui
// (MIT). Instead of repainting the card background, it draws the gradient on
// a 1px masked ring over the existing border, so the card keeps its own
// surface and the effect reuses the tilt's pointer tracking.
const BORDER_MASK = {
  mask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
} as const

export function TiltCard({
  children,
  className,
  maxTilt = 7,
  lift = 6,
  glare = true,
  glow = true,
  as = 'div',
}: TiltCardProps) {
  const Wrapper = tagComponents[as]
  const { isTouch, canHover, prefersReducedMotion } = usePointerCapability()
  const interactive = !isTouch && canHover
  // Reduced motion drops the tilt and lift (movement) but keeps the light
  // that follows the cursor, which moves nothing on screen.
  const tilts = interactive && !prefersReducedMotion

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
  const borderBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(260px circle at ${gx} ${gy}, rgb(52 211 153), rgba(var(--color-accent-rgb), 0.85) 45%, transparent 100%)`,
  )

  const Static = as
  if (!interactive) {
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
      style={tilts ? { rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' } : undefined}
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: tilts ? -lift : 0 } }}
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
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[inherit]"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        >
          {/* Bloom: the blur sits on a parent so it applies after the ring's
              mask; on the ring itself the mask would cut the glow back off. */}
          <div className="absolute inset-0 rounded-[inherit] opacity-70 blur-md">
            <motion.div
              className="absolute inset-0 rounded-[inherit]"
              style={{ background: borderBackground, padding: '3px', ...BORDER_MASK }}
            />
          </div>
          <motion.div
            className="absolute inset-0 rounded-[inherit]"
            style={{ background: borderBackground, padding: '1.5px', ...BORDER_MASK }}
          />
        </motion.div>
      )}
    </Wrapper>
  )
}
