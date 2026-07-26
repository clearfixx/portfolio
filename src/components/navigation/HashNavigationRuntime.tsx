'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const MAX_TARGET_ATTEMPTS = 48
const SETTLE_DELAY_MS = 420
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function getHashTarget(): HTMLElement | null {
  const rawHash = window.location.hash.slice(1)

  if (!rawHash) {
    return null
  }

  let targetId = rawHash

  try {
    targetId = decodeURIComponent(rawHash)
  } catch {
    // Keep the raw hash when it is not valid URI-encoded text.
  }

  return document.getElementById(targetId)
}

export function HashNavigationRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    let animationFrame = 0
    let settleTimer: number | null = null

    const clearScheduledWork = () => {
      window.cancelAnimationFrame(animationFrame)

      if (settleTimer !== null) {
        window.clearTimeout(settleTimer)
        settleTimer = null
      }
    }

    const scheduleHashScroll = () => {
      clearScheduledWork()

      const expectedHash = window.location.hash

      if (!expectedHash) {
        return
      }

      let attempts = 0

      const scrollWhenReady = () => {
        if (cancelled || window.location.hash !== expectedHash) {
          return
        }

        const target = getHashTarget()

        if (!target) {
          attempts += 1

          if (attempts < MAX_TARGET_ATTEMPTS) {
            animationFrame = window.requestAnimationFrame(scrollWhenReady)
          }

          return
        }

        const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

        target.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })

        settleTimer = window.setTimeout(() => {
          if (cancelled || window.location.hash !== expectedHash) {
            return
          }

          const settledTarget = getHashTarget()

          if (!settledTarget) {
            return
          }

          settledTarget.scrollIntoView({
            behavior: 'auto',
            block: 'start',
          })
        }, SETTLE_DELAY_MS)
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = window.requestAnimationFrame(scrollWhenReady)
      })
    }

    scheduleHashScroll()

    window.addEventListener('hashchange', scheduleHashScroll)
    window.addEventListener('pageshow', scheduleHashScroll)

    return () => {
      cancelled = true
      clearScheduledWork()
      window.removeEventListener('hashchange', scheduleHashScroll)
      window.removeEventListener('pageshow', scheduleHashScroll)
    }
  }, [pathname])

  return null
}
