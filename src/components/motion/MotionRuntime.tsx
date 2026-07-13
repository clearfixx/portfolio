'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'

const MOTION_SELECTOR = '[data-motion]'
const VISIBLE_STATE = 'visible'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const IMMEDIATE_REVEAL_LINE = 0.9

function revealElement(element: HTMLElement) {
  element.dataset.motionState = VISIBLE_STATE
  element.removeAttribute('inert')
}

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight
}

function shouldRevealImmediately(element: HTMLElement) {
  const triggerLine = getViewportHeight() * IMMEDIATE_REVEAL_LINE

  return element.getBoundingClientRect().top <= triggerLine
}

function getMotionElements(root: ParentNode = document) {
  return Array.from(root.querySelectorAll<HTMLElement>(MOTION_SELECTOR))
}

export function MotionRuntime() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const root = document.documentElement
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const observedElements = new Set<HTMLElement>()

    let intersectionObserver: IntersectionObserver | null = null

    const reveal = (element: HTMLElement) => {
      revealElement(element)
      intersectionObserver?.unobserve(element)
      observedElements.delete(element)
    }

    const prepareElement = (element: HTMLElement) => {
      if (element.dataset.motionState === VISIBLE_STATE) {
        element.removeAttribute('inert')
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

      element.setAttribute('inert', '')
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

      relatedMotionElements.forEach(reveal)
    }

    revealHashTarget()

    const mutationObserver =
      'MutationObserver' in window
        ? new MutationObserver((records) => {
            records.forEach((record) => {
              record.addedNodes.forEach((node) => {
                if (!(node instanceof Element)) {
                  return
                }

                if (node.matches(MOTION_SELECTOR)) {
                  prepareElement(node as HTMLElement)
                }

                node.querySelectorAll<HTMLElement>(MOTION_SELECTOR).forEach(prepareElement)
              })
            })
          })
        : null

    mutationObserver?.observe(document.body, {
      childList: true,
      subtree: true,
    })

    const revealAll = () => {
      getMotionElements().forEach(reveal)
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

      if (motionElement) {
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

    return () => {
      intersectionObserver?.disconnect()
      mutationObserver?.disconnect()
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      document.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('hashchange', revealHashTarget)
      window.removeEventListener('pageshow', handlePageShow)
      window.removeEventListener('beforeprint', revealAll)

      getMotionElements().forEach((element) => {
        element.removeAttribute('inert')
      })

      delete root.dataset.motionReady
    }
  }, [pathname])

  return null
}
