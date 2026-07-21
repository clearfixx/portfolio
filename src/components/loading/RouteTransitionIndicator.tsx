'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const REVEAL_DELAY_MS = 120
const SAFETY_TIMEOUT_MS = 4500

export function RouteTransitionIndicator() {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const revealTimerRef = useRef<number | null>(null)
  const safetyTimerRef = useRef<number | null>(null)
  const completionFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const clearTimers = () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current)
        revealTimerRef.current = null
      }

      if (safetyTimerRef.current !== null) {
        window.clearTimeout(safetyTimerRef.current)
        safetyTimerRef.current = null
      }

      if (completionFrameRef.current !== null) {
        window.cancelAnimationFrame(completionFrameRef.current)
        completionFrameRef.current = null
      }
    }

    const start = () => {
      clearTimers()

      revealTimerRef.current = window.setTimeout(() => {
        setIsActive(true)
      }, REVEAL_DELAY_MS)

      safetyTimerRef.current = window.setTimeout(() => {
        setIsActive(false)
        clearTimers()
      }, SAFETY_TIMEOUT_MS)
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const nextUrl = new URL(anchor.href, window.location.href)
      if (nextUrl.origin !== window.location.origin) return

      const isSameDocumentHash =
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search &&
        Boolean(nextUrl.hash)

      if (isSameDocumentHash || nextUrl.href === window.location.href) return

      start()
    }

    const onPopState = () => start()

    document.addEventListener('click', onDocumentClick, true)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('click', onDocumentClick, true)
      window.removeEventListener('popstate', onPopState)
      clearTimers()
    }
  }, [])

  useEffect(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current)
      revealTimerRef.current = null
    }

    if (safetyTimerRef.current !== null) {
      window.clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }

    if (completionFrameRef.current !== null) {
      window.cancelAnimationFrame(completionFrameRef.current)
    }

    completionFrameRef.current = window.requestAnimationFrame(() => {
      completionFrameRef.current = null
      setIsActive(false)
    })

    return () => {
      if (completionFrameRef.current !== null) {
        window.cancelAnimationFrame(completionFrameRef.current)
        completionFrameRef.current = null
      }
    }
  }, [pathname])

  return (
    <div
      aria-hidden="true"
      className={`route-transition ${isActive ? 'is-active' : ''}`}
      data-testid="route-transition"
    >
      <span className="route-transition__track">
        <i />
      </span>
    </div>
  )
}
