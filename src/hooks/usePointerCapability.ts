import { useSyncExternalStore } from 'react'

interface PointerCapability {
  isTouch: boolean
  canHover: boolean
  prefersReducedMotion: boolean
}

const QUERIES = {
  isTouch: '(pointer: coarse)',
  canHover: '(hover: hover)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
} as const

function readSnapshot(): PointerCapability {
  return {
    isTouch: window.matchMedia(QUERIES.isTouch).matches,
    canHover: window.matchMedia(QUERIES.canHover).matches,
    prefersReducedMotion: window.matchMedia(QUERIES.prefersReducedMotion).matches,
  }
}

let cached: PointerCapability | null = null

function subscribe(callback: () => void) {
  const lists = Object.values(QUERIES).map((query) => window.matchMedia(query))
  const handler = () => {
    cached = readSnapshot()
    callback()
  }
  lists.forEach((list) => list.addEventListener('change', handler))
  return () => lists.forEach((list) => list.removeEventListener('change', handler))
}

function getSnapshot(): PointerCapability {
  if (!cached) cached = readSnapshot()
  return cached
}

const serverSnapshot: PointerCapability = { isTouch: true, canHover: false, prefersReducedMotion: false }

export function usePointerCapability(): PointerCapability {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot)
}
