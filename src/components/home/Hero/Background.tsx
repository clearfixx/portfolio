'use client'

import { useEffect, useRef } from 'react'

export { BlueprintBackground as Background } from './hero-background/BlueprintBackground'

type Particle = {
  x: number
  y: number
  speed: number
  offset: number
  size: number
  lane: number
}

const PARTICLES = 84
const FPS = 30
const MAX_DPR = 1.25
const LINK_DISTANCE = 118

function waveY(width: number, height: number, x: number, lane: number, time: number) {
  const center = height * (0.34 + lane * 0.09)
  const amplitude = height * (0.055 + lane * 0.018)
  const phase = lane * 1.7 + time * 0.00028

  return center + Math.sin((x / width) * Math.PI * 2.4 + phase) * amplitude
}

/** Temporary rollback target while the Phase 5.0.1 prototype is reviewed. */
export function LegacyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })

    if (!canvas || !ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let frameId = 0
    let lastFrame = 0
    let particles: Particle[] = []

    const createParticles = () => {
      particles = Array.from({ length: PARTICLES }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.16 + Math.random() * 0.28,
        offset: Math.random() * Math.PI * 2,
        size: 1.1 + Math.random() * 1.6,
        lane: index % 5,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    const drawWave = (time: number, lane: number, alpha: number, widthScale = 1) => {
      ctx.beginPath()

      for (let x = -80; x <= width + 80; x += 22) {
        const y =
          waveY(width, height, x, lane, time) +
          Math.cos(time * 0.00018 + x * 0.006 + lane) * 18 * widthScale

        if (x === -80) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.strokeStyle = `rgba(105, 239, 255, ${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const draw = (time: number) => {
      if (time - lastFrame < 1000 / FPS) {
        frameId = window.requestAnimationFrame(draw)
        return
      }

      lastFrame = time

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      const glowX = width * (0.46 + Math.sin(time * 0.00012) * 0.08)
      const glowY = height * (0.36 + Math.cos(time * 0.00016) * 0.06)
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.42)

      glow.addColorStop(0, 'rgba(105, 239, 255, 0.13)')
      glow.addColorStop(0.36, 'rgba(80, 255, 212, 0.055)')
      glow.addColorStop(1, 'rgba(105, 239, 255, 0)')

      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      drawWave(time, 0, 0.055)
      drawWave(time, 1, 0.07, 0.85)
      drawWave(time, 2, 0.045, 1.15)
      drawWave(time, 3, 0.035, 0.65)

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.speed

          if (particle.x > width + 50) {
            particle.x = -50
            particle.lane = Math.floor(Math.random() * 5)
            particle.speed = 0.16 + Math.random() * 0.28
          }
        }

        const targetY =
          waveY(width, height, particle.x, particle.lane, time) +
          Math.sin(time * 0.0012 + particle.offset) * 28

        particle.y += (targetY - particle.y) * 0.055

        const pulse = 0.65 + Math.sin(time * 0.002 + particle.offset) * 0.25
        const alpha = 0.16 + pulse * 0.22

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size + pulse * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(105, 239, 255, ${alpha})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]

          if (Math.abs(a.lane - b.lane) > 1) continue

          const distance = Math.hypot(a.x - b.x, a.y - b.y)

          if (distance > LINK_DISTANCE) continue

          const alpha = 0.09 * (1 - distance / LINK_DISTANCE)

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(105, 239, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      const scanX = ((time * 0.018) % (width + 360)) - 180
      const scan = ctx.createLinearGradient(scanX - 120, 0, scanX + 120, 0)

      scan.addColorStop(0, 'rgba(105, 239, 255, 0)')
      scan.addColorStop(0.5, 'rgba(105, 239, 255, 0.045)')
      scan.addColorStop(1, 'rgba(105, 239, 255, 0)')

      ctx.fillStyle = scan
      ctx.fillRect(scanX - 120, 0, 240, height)

      ctx.restore()

      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    frameId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="hero-background" ref={canvasRef} aria-hidden="true" />
}
