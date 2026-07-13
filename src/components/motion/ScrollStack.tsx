'use client'

import { Children, type ReactNode, useEffect, useRef } from 'react'

type ScrollStackProps = {
  children: ReactNode
  className?: string
}

const STACK_MODE_QUERY =
  '(min-width: 1024px) and (min-height: 681px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const parseLength = (value: string) => {
  const parsed = Number.parseFloat(value)

  return Number.isFinite(parsed) ? parsed : 0
}

const setStyleIfChanged = (
  element: HTMLElement,
  property: 'opacity' | 'transform',
  value: string,
) => {
  if (element.style[property] !== value) {
    element.style[property] = value
  }
}

export function ScrollStack({ children, className }: ScrollStackProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const rootClassName = ['scroll-stack', className].filter(Boolean).join(' ')
  const items = Children.toArray(children)

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    const stackItems = Array.from(
      root.querySelectorAll<HTMLElement>(':scope > [data-scroll-stack-item]'),
    )
    const stackModeQuery = window.matchMedia(STACK_MODE_QUERY)

    let animationFrame = 0
    let geometryDirty = true
    let stackIsNearViewport = true

    const resetVisualState = () => {
      stackItems.forEach((item) => {
        setStyleIfChanged(item, 'transform', 'translate3d(0, 0px, 0) scale(1)')
        setStyleIfChanged(item, 'opacity', '1')

        if (item.dataset.stackState !== 'active') {
          item.dataset.stackState = 'active'
        }

        item.removeAttribute('inert')
      })
    }

    const syncItemOffsets = () => {
      const rootStyles = window.getComputedStyle(root)
      const baseTop = parseLength(rootStyles.getPropertyValue('--portfolio-stack-top'))
      const step = parseLength(rootStyles.getPropertyValue('--portfolio-stack-step'))
      const bottomGap = parseLength(rootStyles.getPropertyValue('--portfolio-stack-bottom-gap'))
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight

      stackItems.forEach((item, index) => {
        const itemHeight = item.offsetHeight
        const desiredTop = baseTop + step * index
        const fullyVisibleTop = viewportHeight - itemHeight - bottomGap
        const resolvedTop = Math.min(desiredTop, fullyVisibleTop)

        item.style.setProperty('--scroll-stack-item-top', `${Math.round(resolvedTop)}px`)
        item.dataset.stackSize = resolvedTop < desiredTop ? 'tall' : 'viewport'
      })

      geometryDirty = false
    }

    const syncVisualState = () => {
      if (!stackModeQuery.matches) {
        resetVisualState()
        return
      }

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const coverStart = viewportHeight * 0.82

      /*
       * Read every geometry value first. DOM writes happen only after all
       * reads, preventing read/write interleaving inside the frame.
       */
      const nextTops = stackItems.map((_, index) => {
        const nextItem = stackItems[index + 1]

        return nextItem ? nextItem.getBoundingClientRect().top : Number.POSITIVE_INFINITY
      })

      stackItems.forEach((item, index) => {
        const nextItem = stackItems[index + 1]
        let progress = 0

        if (nextItem) {
          const nextStickyTop = parseLength(
            nextItem.style.getPropertyValue('--scroll-stack-item-top'),
          )
          const coverEnd = nextStickyTop + Math.min(56, viewportHeight * 0.07)
          const coverDistance = Math.max(1, coverStart - coverEnd)

          progress = clamp((coverStart - nextTops[index]) / coverDistance, 0, 1)
        }

        /*
         * Quantization avoids writing microscopically different values on
         * every high-frequency trackpad event while remaining visually smooth.
         */
        const visualProgress = Math.round(progress * 240) / 240
        const scale = 1 - visualProgress * 0.012
        const lift = visualProgress * -12
        const opacity = 1 - visualProgress * 0.07

        setStyleIfChanged(
          item,
          'transform',
          `translate3d(0, ${lift.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
        )
        setStyleIfChanged(item, 'opacity', opacity.toFixed(3))

        const nextState =
          visualProgress >= 0.98 ? 'covered' : visualProgress > 0.02 ? 'covering' : 'active'

        if (item.dataset.stackState !== nextState) {
          item.dataset.stackState = nextState
        }

        item.toggleAttribute('inert', nextState === 'covered')
      })
    }

    const updateStack = () => {
      animationFrame = 0

      if (!stackIsNearViewport) {
        return
      }

      if (geometryDirty) {
        syncItemOffsets()
      }

      syncVisualState()
    }

    const scheduleUpdate = (withGeometry = false) => {
      geometryDirty = geometryDirty || withGeometry

      if (animationFrame !== 0) {
        return
      }

      animationFrame = requestAnimationFrame(updateStack)
    }

    const handleScroll = () => scheduleUpdate()
    const handleResize = () => scheduleUpdate(true)
    const handleModeChange = () => {
      root.dataset.stackRuntime = stackIsNearViewport && stackModeQuery.matches ? 'active' : 'idle'
      scheduleUpdate(true)
    }

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(() => scheduleUpdate(true)) : null

    resizeObserver?.observe(root)
    stackItems.forEach((item) => resizeObserver?.observe(item))

    const visibilityObserver =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              stackIsNearViewport = entry?.isIntersecting ?? true
              root.dataset.stackRuntime =
                stackIsNearViewport && stackModeQuery.matches ? 'active' : 'idle'

              if (stackIsNearViewport) {
                scheduleUpdate()
              }
            },
            {
              rootMargin: '75% 0px 75% 0px',
            },
          )
        : null

    visibilityObserver?.observe(root)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)
    stackModeQuery.addEventListener('change', handleModeChange)

    root.dataset.stackRuntime = stackModeQuery.matches ? 'active' : 'idle'
    scheduleUpdate(true)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
      stackModeQuery.removeEventListener('change', handleModeChange)
      delete root.dataset.stackRuntime
    }
  }, [items.length])

  return (
    <div className={rootClassName} data-scroll-stack data-stack-runtime="idle" ref={rootRef}>
      {items.map((item, index) => (
        <div
          className="scroll-stack__item"
          data-scroll-stack-item
          data-stack-index={index + 1}
          data-stack-state="active"
          key={index}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
