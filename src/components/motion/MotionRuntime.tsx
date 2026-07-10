'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

const MOTION_SELECTOR = '[data-motion]'
const VISIBLE_STATE = 'visible'

function revealElement(element: HTMLElement) {
  element.dataset.motionState = VISIBLE_STATE
}

export function MotionRuntime() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const root = document.documentElement

    root.dataset.motionReady = 'true'

    return () => {
      delete root.dataset.motionReady
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(MOTION_SELECTOR)).filter(
      (element) => element.dataset.motionState !== VISIBLE_STATE,
    )

    if (elements.length === 0) {
      return
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const revealAll = () => elements.forEach(revealElement)

    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const element = entry.target as HTMLElement

          revealElement(element)
          observer.unobserve(element)
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    )

    elements.forEach((element) => observer.observe(element))

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return
      }

      revealAll()
      observer.disconnect()
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      observer.disconnect()
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [pathname])

  return null
}
