/**
 * Beams Background, adapted from Kokonut UI (via 21st.dev).
 * Original: @dorianbaffier, https://github.com/kokonut-labs/kokonutui
 * License: MIT
 *
 * Changes from the original: only the canvas layer is kept (the hero owns the
 * layout), the hues moved from blue/violet to the brand emerald with a few
 * accent beams, and the canvas runs at 1x DPR with fewer beams on touch
 * devices, since everything is blurred anyway.
 */
import { useEffect, useRef } from 'react'

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  accent: boolean
  pulse: number
  pulseSpeed: number
  gradient: CanvasGradient | null
}

// Beams are drawn unblurred into a low-resolution buffer that is blurred once
// per frame, instead of blurring every beam. The margin keeps beams that cross
// an edge from fading out there.
const BEAM_BLUR = 'blur(35px)'
const BUFFER_SCALE = 0.5
const BUFFER_MARGIN = 105

// Speeds are per 60 Hz frame.
const FRAME_MS = 1000 / 60

const ACCENT_HUE = 28
const ACCENT_CHANCE = 0.14

function createBeam(width: number, height: number, isDarkMode: boolean): Beam {
  const accent = Math.random() < ACCENT_CHANCE
  const hueBase = isDarkMode ? 145 : 150
  const hueRange = isDarkMode ? 40 : 28

  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: accent ? ACCENT_HUE + Math.random() * 8 : hueBase + Math.random() * hueRange,
    accent,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
    gradient: null,
  }
}

/** A beam that left through the top comes back below the bottom edge. */
function respawnBeam(index: number, width: number, height: number, isDarkMode: boolean): Beam {
  const spacing = width / 3
  return {
    ...createBeam(width, height, isDarkMode),
    x: (index % 3) * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5,
    y: height + 100,
  }
}

function createBeamGradient(ctx: CanvasRenderingContext2D, beam: Beam, isDarkMode: boolean) {
  const saturation = isDarkMode ? '80%' : '62%'
  const lightness = isDarkMode ? (beam.accent ? '66%' : '58%') : beam.accent ? '58%' : '42%'
  const color = (alpha: number) => `hsla(${beam.hue}, ${saturation}, ${lightness}, ${alpha})`

  const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
  gradient.addColorStop(0, color(0))
  gradient.addColorStop(0.1, color(0.5))
  gradient.addColorStop(0.4, color(1))
  gradient.addColorStop(0.6, color(1))
  gradient.addColorStop(0.9, color(0.5))
  gradient.addColorStop(1, color(0))
  return gradient
}

interface BeamsBackgroundProps {
  className?: string
  /** Global opacity multiplier for every beam. */
  intensity?: number
}

export function BeamsBackground({ className = '', intensity = 1 }: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    const buffer = document.createElement('canvas')
    const bufferCtx = buffer.getContext('2d')
    if (!(canvas && container && ctx && bufferCtx)) return

    // Older Safari has no canvas filter: the beams would be hard-edged bars,
    // so the CSS blur on the element takes over the whole job.
    const supportsCanvasFilter = typeof ctx.filter === 'string'
    canvas.style.filter = supportsCanvasFilter ? 'blur(15px)' : 'blur(42px)'

    // Under reduced motion one still frame is drawn, and redrawn when the
    // size or the theme changes.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const totalBeams = isCoarse ? 18 : 30

    // The layer sets --beams-dark through the `dark:` variant, so this follows
    // the class-based theme toggle.
    const readDarkMode = () => getComputedStyle(container).getPropertyValue('--beams-dark').trim() === '1'

    let width = 0
    let height = 0
    let isDarkMode = readDarkMode()
    let beams: Beam[] = []
    let frameId = 0
    let lastTime = 0
    let isVisible = false

    const drawBeam = (beam: Beam) => {
      beam.gradient ??= createBeamGradient(bufferCtx, beam, isDarkMode)
      bufferCtx.save()
      bufferCtx.translate(beam.x, beam.y)
      bufferCtx.rotate((beam.angle * Math.PI) / 180)
      bufferCtx.globalAlpha = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * intensity
      bufferCtx.fillStyle = beam.gradient
      bufferCtx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      bufferCtx.restore()
    }

    const draw = () => {
      const bufferWidth = width + BUFFER_MARGIN * 2
      const bufferHeight = height + BUFFER_MARGIN * 2

      bufferCtx.clearRect(-BUFFER_MARGIN, -BUFFER_MARGIN, bufferWidth, bufferHeight)
      for (const beam of beams) drawBeam(beam)

      ctx.clearRect(0, 0, width, height)
      if (supportsCanvasFilter) ctx.filter = BEAM_BLUR
      ctx.drawImage(buffer, -BUFFER_MARGIN, -BUFFER_MARGIN, bufferWidth, bufferHeight)
    }

    const step = (frames: number) => {
      for (let i = 0; i < beams.length; i++) {
        const beam = beams[i]
        beam.y -= beam.speed * frames
        beam.pulse += beam.pulseSpeed * frames
        if (beam.y + beam.length < -100) beams[i] = respawnBeam(i, width, height, isDarkMode)
      }
    }

    const tick = (now: number) => {
      // Scale by the real frame time so the speed is the same at any refresh
      // rate. The cap keeps a long pause from jumping the beams.
      const frames = lastTime ? Math.min((now - lastTime) / FRAME_MS, 4) : 1
      lastTime = now
      step(frames)
      draw()
      frameId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (frameId || prefersReducedMotion || !isVisible) return
      lastTime = 0
      frameId = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = 0
    }

    const resize = () => {
      const nextWidth = container.clientWidth
      const nextHeight = container.clientHeight
      if (nextWidth === width && nextHeight === height) return

      width = nextWidth
      height = nextHeight
      // Everything ends up behind a 35px blur, so extra device pixels would
      // only cost fill rate.
      canvas.width = width
      canvas.height = height

      buffer.width = Math.ceil((width + BUFFER_MARGIN * 2) * BUFFER_SCALE)
      buffer.height = Math.ceil((height + BUFFER_MARGIN * 2) * BUFFER_SCALE)
      bufferCtx.setTransform(
        BUFFER_SCALE,
        0,
        0,
        BUFFER_SCALE,
        BUFFER_MARGIN * BUFFER_SCALE,
        BUFFER_MARGIN * BUFFER_SCALE,
      )

      beams = Array.from({ length: totalBeams }, () => createBeam(width, height, isDarkMode))
      draw()
    }

    const updateDarkMode = () => {
      const next = readDarkMode()
      if (next === isDarkMode) return
      isDarkMode = next
      for (const beam of beams) beam.gradient = null
      if (!frameId) draw()
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // Only animate while the background is on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false
      if (isVisible) start()
      else stop()
    })
    visibilityObserver.observe(container)

    const themeObserver = new MutationObserver(updateDarkMode)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [intensity])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 [--beams-dark:0] dark:[--beams-dark:1] ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
