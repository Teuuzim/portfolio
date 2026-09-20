import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y);
    vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);

    float t = uTime * 0.05;
    float n1 = smoothNoise(p * 2.2 + vec2(t, -t * 0.7));
    float n2 = smoothNoise(p * 3.4 - vec2(t * 0.6, t));
    float dist = distance(p, mouse);
    float mouseInfluence = smoothstep(0.9, 0.0, dist) * 0.35;

    float mixValue = clamp(n1 * 0.6 + n2 * 0.4 + mouseInfluence, 0.0, 1.0);
    vec3 color = mix(uColorA, uColorB, mixValue);
    color = mix(color, uColorC, smoothstep(0.55, 1.0, n2) * 0.5);

    float vignette = smoothstep(1.1, 0.2, length(uv - 0.5));
    gl_FragColor = vec4(color, vignette * 0.9);
  }
`

function hexToVec3(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16) / 255
  const g = parseInt(clean.substring(2, 4), 16) / 255
  const b = parseInt(clean.substring(4, 6), 16) / 255
  return [r, g, b]
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) })
    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    container.appendChild(gl.canvas)

    const isDark = document.documentElement.classList.contains('dark')
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uColorA: { value: hexToVec3(isDark ? '#071510' : '#EDF8F1') },
        uColorB: { value: hexToVec3(isDark ? '#0C5C42' : '#16845B') },
        uColorC: { value: hexToVec3('#E8873A') },
      },
      transparent: true,
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    function resize() {
      if (!container) return
      renderer.setSize(container.clientWidth, container.clientHeight)
      program.uniforms.uResolution.value = [container.clientWidth, container.clientHeight]
    }
    resize()
    window.addEventListener('resize', resize)

    function handlePointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      program.uniforms.uMouse.value = [
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      ]
    }
    window.addEventListener('pointermove', handlePointerMove)

    let frameId = 0
    let paused = false
    function update(time: number) {
      if (!paused) {
        program.uniforms.uTime.value = time * 0.001
        renderer.render({ scene: mesh })
      }
      frameId = requestAnimationFrame(update)
    }
    frameId = requestAnimationFrame(update)

    const handleVisibility = () => {
      paused = document.visibilityState === 'hidden'
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const observer = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting
      },
      { threshold: 0 },
    )
    observer.observe(container)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
      const loseContext = gl.getExtension('WEBGL_lose_context')
      loseContext?.loseContext()
      gl.canvas.remove()
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0" />
}
