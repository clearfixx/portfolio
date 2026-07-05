'use client'

import { useEffect, useState } from 'react'

import { Terminal } from './Terminal'

const stats = [
  { label: 'Projects Completed', value: 18, suffix: '+', icon: 'projects' },
  { label: 'Commits', value: 6241, suffix: '+', icon: 'commits' },
  { label: 'Years Coding', value: 12, suffix: '+', icon: 'years' },
  { label: 'Coffee Consumed', value: null, suffix: '∞', icon: 'coffee' },
] as const

function StatIcon({ type }: { type: (typeof stats)[number]['icon'] }) {
  if (type === 'projects') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
        <path d="M5 7h14v12H5z" />
        <path d="M9 11h6" />
      </svg>
    )
  }

  if (type === 'commits') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6" />
        <path d="M12 15v6" />
        <path d="M15 12h6" />
      </svg>
    )
  }

  if (type === 'years') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 8h16" />
        <path d="M5 5h14v15H5z" />
        <path d="M9 13h6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h10v6a5 5 0 0 1-5 5H9a3 3 0 0 1-3-3V8Z" />
      <path d="M16 10h2a3 3 0 0 1 0 6h-2" />
      <path d="M8 4v2" />
      <path d="M12 4v2" />
    </svg>
  )
}

function AnimatedValue({
  value,
  suffix,
}: {
  value: number | null
  suffix: string
}) {
  const [currentValue, setCurrentValue] = useState(value === null ? null : 0)

  useEffect(() => {
    if (value === null) return

    const duration = 1100
    const start = performance.now()

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCurrentValue(Math.round(value * eased))

      if (progress < 1) {
        window.requestAnimationFrame(tick)
      }
    }

    const frame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frame)
  }, [value])

  if (value === null) return <>{suffix}</>

  return (
    <>
      {new Intl.NumberFormat('uk-UA').format(currentValue ?? value)}
      {suffix}
    </>
  )
}

export function System() {
  return (
    <aside className="hero-system">
      <Terminal />

      <div className="hero-side-card hero-stats">
        {stats.map((stat) => (
          <div className="hero-stat" key={stat.label}>
            <span className="hero-stat__label">
              <StatIcon type={stat.icon} />
              {stat.label}
            </span>

            <strong>
              <AnimatedValue value={stat.value} suffix={stat.suffix} />
            </strong>
          </div>
        ))}

        <div className="hero-last-commit">
          <span />
          Last commit: <strong>2 hours ago</strong>
        </div>
      </div>
    </aside>
  )
}
