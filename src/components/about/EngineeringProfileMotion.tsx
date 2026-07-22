'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

type EngineeringProfileMotionProps = {
  children: ReactNode
}

export function EngineeringProfileMotion({ children }: EngineeringProfileMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-profile-reveal]'))

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.setAttribute('data-profile-visible', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.setAttribute('data-profile-visible', 'true')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    )

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="engineering-profile-motion" ref={rootRef}>
      {children}
    </div>
  )
}
