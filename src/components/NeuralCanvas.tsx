import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DISTANCE = 150
const MOUSE_RADIUS = 200

/**
 * Interactive "neural network" backdrop for the hero: particles drift and
 * connect to nearby neighbours, with connections brightening near the
 * cursor. Colors are re-read from CSS theme tokens each frame so it
 * re-tints instantly on theme toggle. Renders a single static frame (no
 * rAF loop) when the user prefers reduced motion.
 */
export function NeuralCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let rafId = 0
    const mouse = { x: -9999, y: -9999, active: false }

    function readColor(name: string, fallback: string) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      return value || fallback
    }

    function seedParticles() {
      const area = width * height
      const count = Math.round(Math.min(90, Math.max(28, area / 9000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    function resize() {
      const parent = canvas!.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedParticles()
    }

    function drawFrame() {
      const dotColor = readColor('--text-dim', '#9aa3b8')
      const lineColor = readColor('--violet', '#7c5cff')
      const mouseLineColor = readColor('--cyan', '#22d3ee')

      ctx!.clearRect(0, 0, width, height)

      // Update positions
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x <= 0 || p.x >= width) p.vx *= -1
        if (p.y <= 0 || p.y >= height) p.vy *= -1
        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      }

      // Links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx!.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.35
            ctx!.strokeStyle = lineColor
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // Links + glow from cursor
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_RADIUS) {
            ctx!.globalAlpha = (1 - dist / MOUSE_RADIUS) * 0.6
            ctx!.strokeStyle = mouseLineColor
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(mouse.x, mouse.y)
            ctx!.stroke()
          }
        }
      }

      // Dots
      ctx!.globalAlpha = 0.8
      ctx!.fillStyle = dotColor
      for (const p of particles) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    function loop() {
      drawFrame()
      rafId = requestAnimationFrame(loop)
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = true
    }

    function handlePointerLeave() {
      mouse.active = false
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    if (reduceMotion) {
      drawFrame()
    } else {
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      cancelAnimationFrame(rafId)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
