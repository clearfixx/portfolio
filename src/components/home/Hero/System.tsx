'use client'

import { useEffect, useState } from 'react'

import { Terminal } from './Terminal'

const telemetryStats = [
  { label: 'Projects shipped', value: 18, suffix: '+' },
  { label: 'Commits pushed', value: 6241, suffix: '+' },
  { label: 'Years coding', value: 12, suffix: '+' },
  { label: 'Debug sessions', value: null, suffix: '∞' },
] as const

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
        <div className="hero-stats__header">
          <span>Developer Telemetry</span>
          <strong>Synced</strong>
        </div>

        <div className="hero-stats__grid">
          {telemetryStats.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <strong className="hero-stat__value">
                <AnimatedValue value={stat.value} suffix={stat.suffix} />
              </strong>

              <span className="hero-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-last-commit">
          <span aria-hidden="true" />
          <em>GitHub activity</em>
          <strong>Last commit pushed 2 hours ago</strong>
        </div>
      </div>
    </aside>
  )
}
