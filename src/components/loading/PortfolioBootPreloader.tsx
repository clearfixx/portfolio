'use client'

import { useEffect, useState } from 'react'

type BootPhase = 'booting' | 'ready' | 'leaving' | 'hidden'

const MINIMUM_VISIBLE_MS = 320
const READY_HOLD_MS = 140
const EXIT_DURATION_MS = 520
const FAILSAFE_MS = 4500

function BootMark() {
  return (
    <svg aria-hidden="true" className="portfolio-boot__mark" fill="none" viewBox="0 0 176 124">
      <path d="M11 40H31L24 47H19V84H24L31 91H11V40Z" fill="rgb(var(--rgb-accent))" />
      <path
        clipRule="evenodd"
        d="M54.5 40H72.5L89.5 91H76.4L73.2 80.6H53.4L50.2 91H37.2L54.5 40ZM56.8 69.6H69.8L63.3 48.8L56.8 69.6Z"
        fill="rgb(var(--rgb-text-strong))"
        fillRule="evenodd"
      />
      <path d="M91.5 40H102.8V91H91.5V40Z" fill="rgb(var(--rgb-text-strong))" />
      <path
        d="M103 62.2L121.3 40H135.4L114.3 64.2L136.8 91H122.1L103 67.2V62.2Z"
        fill="rgb(var(--rgb-text-strong))"
      />
      <path d="M165 40H145L152 47H157V84H152L145 91H165V40Z" fill="rgb(var(--rgb-purple))" />
    </svg>
  )
}

export function PortfolioBootPreloader() {
  const [phase, setPhase] = useState<BootPhase>('booting')

  useEffect(() => {
    const startedAt = performance.now()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers = new Set<number>()
    let hasResolved = false
    let failsafeTimer: number | null = null

    document.documentElement.classList.add('portfolio-boot-active')

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        callback()
      }, delay)

      timers.add(timer)
      return timer
    }

    const cancelTimer = (timer: number | null) => {
      if (timer === null) return
      window.clearTimeout(timer)
      timers.delete(timer)
    }

    const hide = () => {
      setPhase('hidden')
      document.documentElement.classList.remove('portfolio-boot-active')
    }

    const finish = () => {
      if (hasResolved) return
      hasResolved = true
      cancelTimer(failsafeTimer)

      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, MINIMUM_VISIBLE_MS - elapsed)

      schedule(
        () => {
          setPhase('ready')

          schedule(
            () => {
              setPhase('leaving')
              schedule(hide, reducedMotion ? 40 : EXIT_DURATION_MS)
            },
            reducedMotion ? 40 : READY_HOLD_MS,
          )
        },
        reducedMotion ? 0 : remaining,
      )
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    failsafeTimer = schedule(() => {
      if (hasResolved) return
      hasResolved = true
      hide()
    }, FAILSAFE_MS)

    return () => {
      window.removeEventListener('load', finish)
      timers.forEach((timer) => window.clearTimeout(timer))
      document.documentElement.classList.remove('portfolio-boot-active')
    }
  }, [])

  if (phase === 'hidden') return null

  const isReady = phase === 'ready' || phase === 'leaving'

  return (
    <div
      aria-label={isReady ? 'Portfolio interface ready' : 'Portfolio interface loading'}
      aria-live="polite"
      className="portfolio-boot"
      data-phase={phase}
      role="status"
    >
      <div aria-hidden="true" className="portfolio-boot__grid" />
      <div aria-hidden="true" className="portfolio-boot__signal portfolio-boot__signal--cyan" />
      <div aria-hidden="true" className="portfolio-boot__signal portfolio-boot__signal--purple" />

      <div className="portfolio-boot__panel">
        <div className="portfolio-boot__brand">
          <BootMark />
          <div>
            <span>AK / PORTFOLIO</span>
            <strong>Runtime interface</strong>
          </div>
        </div>

        <div className="portfolio-boot__console">
          <div className="portfolio-boot__console-head">
            <span>BOOT_SEQUENCE</span>
            <span>{isReady ? 'SYSTEM_READY' : 'INITIALIZING'}</span>
          </div>

          <div aria-hidden="true" className="portfolio-boot__core">
            <span />
            <span />
            <span />
            <i />
          </div>

          <div className="portfolio-boot__stages">
            <span className="is-complete">Theme system</span>
            <span className="is-complete">Content layer</span>
            <span className={isReady ? 'is-complete' : 'is-active'}>Motion runtime</span>
            <span className={isReady ? 'is-complete' : ''}>Interface ready</span>
          </div>

          <div aria-hidden="true" className="portfolio-boot__rail">
            <span />
          </div>
        </div>

        <div className="portfolio-boot__footer">
          <span>PORTFOLIO_OS</span>
          <span>BUILD 01</span>
          <span>{isReady ? 'READY' : 'BOOTING'}</span>
        </div>
      </div>
    </div>
  )
}
