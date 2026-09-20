import { useEffect, useState } from 'react'

function detectWebglCapable(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  const nav = navigator as Navigator & { deviceMemory?: number }
  if ((nav.hardwareConcurrency ?? 8) <= 4 && (nav.deviceMemory ?? 8) <= 4) return false

  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function useWebglCapable() {
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    setCapable(detectWebglCapable())
  }, [])

  return capable
}
