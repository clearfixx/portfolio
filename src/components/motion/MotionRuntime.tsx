'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const MOTION_SELECTOR = '[data-motion]'
const PENDING_BOUNDARY_SELECTOR = '[data-motion-hydrated="false"]'
const VISIBLE_STATE = 'visible'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const IMMEDIATE_REVEAL_LINE = 0.9
const IDLE_TIMEOUT = 750
const FALLBACK_DELAY = 180

function revealElement(element: HTMLElement) {
  element.dataset.motionState = VISIBLE_STATE
}

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight
}

function shouldRevealImmediately(element: HTMLElement) {
  const triggerLine = getViewportHeight() * IMMEDIATE_REVEAL_LINE

  return element.getBoundingClientRect().top <= triggerLine
}

function isInsidePendingBoundary(element: HTMLElement) {
  return element.closest(PENDING_BOUNDARY_SELECTOR) !== null
}

function getMotionElements(root: ParentNode = document) {
  return Array.from(root.querySelectorAll<HTMLElement>(MOTION_SELECTOR))
}

function getMotionElementsFromNode(node: Node) {
  if (!(node instanceof Element)) {
    return []
  }

  const elements: HTMLElement[] = []

  if (node.matches(MOTION_SELECTOR)) {
    elements.push(node as HTMLElement)
  }

  node.querySelectorAll<HTMLElement>(MOTION_SELECTOR).forEach((element) => elements.push(element))

  return elements
}

export function MotionRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement

    let cancelled = false
    let firstFrame: number | null = null
    let secondFrame: number | null = null
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null
    let idleCallback: number | null = null
    let disposeRuntime: (() => void) | null = null

    const initializeRuntime = () => {
      if (cancelled) {
        return
      }

      const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
      const observedElements = new Set<HTMLElement>()

      let intersectionObserver: IntersectionObserver | null = null
      let mutationObserver: MutationObserver | null = null
      let isRuntimeDisposed = false

      const reveal = (element: HTMLElement) => {
        revealElement(element)
        intersectionObserver?.unobserve(element)
        observedElements.delete(element)
      }

      const prepareElement = (element: HTMLElement) => {
        if (
          isInsidePendingBoundary(element) ||
          element.dataset.motionState === VISIBLE_STATE ||
          observedElements.has(element)
        ) {
          return
        }

        if (
          reducedMotionQuery.matches ||
          intersectionObserver === null ||
          shouldRevealImmediately(element)
        ) {
          reveal(element)
          return
        }

        observedElements.add(element)
        intersectionObserver.observe(element)
      }

      if (!reducedMotionQuery.matches && 'IntersectionObserver' in window) {
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return
              }

              reveal(entry.target as HTMLElement)
            })
          },
          {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12,
          },
        )
      }

      getMotionElements().forEach(prepareElement)
      root.dataset.motionReady = 'true'

      /*
       * Streamed Server Components are wrapped in StreamedMotionBoundary.
       * Its client effect changes data-motion-hydrated from false to true only
       * after React has hydrated that subtree. Motion attributes are therefore
       * never written into pending server HTML.
       */
      if ('MutationObserver' in window && document.body) {
        mutationObserver = new MutationObserver((records) => {
          records.forEach((record) => {
            if (
              record.type === 'attributes' &&
              record.target instanceof HTMLElement &&
              record.target.dataset.motionHydrated === 'true'
            ) {
              getMotionElements(record.target).forEach(prepareElement)
              return
            }

            record.addedNodes.forEach((node) => {
              getMotionElementsFromNode(node).forEach((element) => {
                if (isInsidePendingBoundary(element)) {
                  return
                }

                /*
                 * Unwrapped insertions keep the conservative two-frame
                 * fallback used by the previous runtime.
                 */
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    if (!isRuntimeDisposed && element.isConnected) {
                      prepareElement(element)
                    }
                  })
                })
              })
            })
          })
        })

        mutationObserver.observe(document.body, {
          attributeFilter: ['data-motion-hydrated'],
          attributes: true,
          childList: true,
          subtree: true,
        })
      }

      const revealHashTarget = () => {
        const rawHash = window.location.hash.slice(1)

        if (!rawHash) {
          return
        }

        let targetId = rawHash

        try {
          targetId = decodeURIComponent(rawHash)
        } catch {
          // Keep the raw hash when it is not valid URI-encoded text.
        }

        const target = document.getElementById(targetId)

        if (!target) {
          return
        }

        const relatedMotionElements = new Set<HTMLElement>()

        if (target.matches(MOTION_SELECTOR)) {
          relatedMotionElements.add(target)
        }

        const closestMotionElement = target.closest<HTMLElement>(MOTION_SELECTOR)

        if (closestMotionElement) {
          relatedMotionElements.add(closestMotionElement)
        }

        target
          .querySelectorAll<HTMLElement>(MOTION_SELECTOR)
          .forEach((element) => relatedMotionElements.add(element))

        relatedMotionElements.forEach((element) => {
          if (!isInsidePendingBoundary(element)) {
            reveal(element)
          }
        })
      }

      revealHashTarget()

      const revealAll = () => {
        getMotionElements().forEach((element) => {
          if (!isInsidePendingBoundary(element)) {
            reveal(element)
          }
        })
      }

      const handleReducedMotionChange = (event: MediaQueryListEvent) => {
        if (!event.matches) {
          return
        }

        revealAll()
        intersectionObserver?.disconnect()
        intersectionObserver = null
      }

      const handleFocusIn = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) {
          return
        }

        const motionElement = event.target.closest<HTMLElement>(MOTION_SELECTOR)

        if (motionElement && !isInsidePendingBoundary(motionElement)) {
          reveal(motionElement)
        }
      }

      const handlePageShow = () => {
        getMotionElements().forEach(prepareElement)
        revealHashTarget()
      }

      reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
      document.addEventListener('focusin', handleFocusIn)
      window.addEventListener('hashchange', revealHashTarget)
      window.addEventListener('pageshow', handlePageShow)
      window.addEventListener('beforeprint', revealAll)

      disposeRuntime = () => {
        isRuntimeDisposed = true
        mutationObserver?.disconnect()
        intersectionObserver?.disconnect()
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
        document.removeEventListener('focusin', handleFocusIn)
        window.removeEventListener('hashchange', revealHashTarget)
        window.removeEventListener('pageshow', handlePageShow)
        window.removeEventListener('beforeprint', revealAll)
      }
    }

    const scheduleRuntime = () => {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if ('requestIdleCallback' in window) {
            idleCallback = window.requestIdleCallback(initializeRuntime, {
              timeout: IDLE_TIMEOUT,
            })
            return
          }

          fallbackTimer = globalThis.setTimeout(initializeRuntime, FALLBACK_DELAY)
        })
      })
    }

    if (document.readyState === 'complete') {
      scheduleRuntime()
    } else {
      window.addEventListener('load', scheduleRuntime, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', scheduleRuntime)

      if (firstFrame !== null) {
        window.cancelAnimationFrame(firstFrame)
      }

      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame)
      }

      if (idleCallback !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback)
      }

      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer)
      }

      disposeRuntime?.()
    }
  }, [pathname])

  return null
}

// public-pages-consistency-runtime-skeletons-v1-8
