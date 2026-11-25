import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

export interface Floater {
  src: string
  /** Position of the floater's top-left corner, in % of the scene. */
  x: number
  y: number
  /** Width in % of the scene. */
  width: number
  /** How strongly it follows the pointer; higher reads as closer to the viewer. */
  depth: number
  /** Seconds for one bob up and down. */
  period?: number
  /** Degrees it sways while bobbing. */
  sway?: number
}

interface FloatingSceneProps {
  src: string
  width: number
  height: number
  floaters: Floater[]
  /** False holds the entrance (the hero waits for the intro screen). */
  play?: boolean
  eager?: boolean
  className?: string
}

const SPRING = { stiffness: 120, damping: 20, mass: 0.6 }
const EASE_IN_OUT = 'easeInOut' as const

function FloaterImage({
  floater,
  index,
  play,
  pointerX,
  pointerY,
}: {
  floater: Floater
  index: number
  play: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}) {
  const x = useTransform(pointerX, (v) => v * floater.depth * 28)
  const y = useTransform(pointerY, (v) => v * floater.depth * 20)
  const period = floater.period ?? 5 + (index % 3)
  const entranceDelay = 0.35 + index * 0.12

  return (
    // The outer layer follows the pointer; the inner one bobs. Kept apart so the
    // two motions add up instead of fighting over the same transform.
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${floater.x}%`, top: `${floater.y}%`, width: `${floater.width}%`, x, y }}
    >
      <motion.img
        src={floater.src}
        alt=""
        draggable={false}
        className="w-full drop-shadow-[0_10px_14px_rgba(30,27,75,0.18)]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          play
            ? { opacity: 1, scale: 1, y: [0, -12, 0], rotate: [0, floater.sway ?? 4, 0] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{
          opacity: { duration: 0.45, delay: entranceDelay },
          scale: { type: 'spring', stiffness: 260, damping: 16, delay: entranceDelay },
          y: { duration: period, ease: EASE_IN_OUT, repeat: Infinity, delay: entranceDelay },
          rotate: { duration: period * 1.3, ease: EASE_IN_OUT, repeat: Infinity, delay: entranceDelay },
        }}
      />
    </motion.div>
  )
}

/**
 * An illustration with loose elements floating around it, like a light Lottie:
 * the scene breathes, the elements pop in one by one and drift, and on desktop
 * everything leans toward the pointer at different depths.
 */
export function FloatingScene({ src, width, height, floaters, play = true, eager = false, className = '' }: FloatingSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  // The entrance plays the first time the scene is on screen, so a scene further
  // down the page hasn't already finished by the time the reader scrolls to it.
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const active = play && inView
  const reduceMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, SPRING)
  const pointerY = useSpring(rawY, SPRING)
  const baseX = useTransform(pointerX, (v) => v * -8)
  const baseY = useTransform(pointerY, (v) => v * -6)

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((event.clientX - rect.left) / rect.width - 0.5)
    rawY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ x: baseX, y: baseY }}>
        <motion.img
          src={src}
          alt=""
          width={width}
          height={height}
          loading={eager ? undefined : 'lazy'}
          draggable={false}
          className="w-full"
          animate={active ? { y: [0, -6, 0] } : undefined}
          transition={{ duration: 6, ease: EASE_IN_OUT, repeat: Infinity }}
        />
      </motion.div>
      {floaters.map((floater, index) => (
        <FloaterImage
          key={floater.src}
          floater={floater}
          index={index}
          play={active}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      ))}
    </div>
  )
}
