'use client'

import { Children, type ReactNode, useEffect, useRef } from 'react'

type ScrollStackProps = {
  children: ReactNode
  className?: string
}

const parseLength = (value: string) => {
  const parsed = Number.parseFloat(value)

  return Number.isFinite(parsed) ? parsed : 0
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

    let animationFrame = 0

    const syncItemOffsets = () => {
      cancelAnimationFrame(animationFrame)

      animationFrame = requestAnimationFrame(() => {
        const rootStyles = window.getComputedStyle(root)
        const baseTop = parseLength(
          rootStyles.getPropertyValue('--portfolio-stack-top'),
        )
        const step = parseLength(
          rootStyles.getPropertyValue('--portfolio-stack-step'),
        )
        const bottomGap = parseLength(
          rootStyles.getPropertyValue('--portfolio-stack-bottom-gap'),
        )
        const viewportHeight =
          window.visualViewport?.height ?? window.innerHeight

        stackItems.forEach((item, index) => {
          const itemHeight = item.offsetHeight
          const desiredTop = baseTop + step * index
          const fullyVisibleTop = viewportHeight - itemHeight - bottomGap
          const resolvedTop = Math.min(desiredTop, fullyVisibleTop)

          item.style.setProperty(
            '--scroll-stack-item-top',
            `${Math.round(resolvedTop)}px`,
          )

          item.dataset.stackSize =
            resolvedTop < desiredTop ? 'tall' : 'viewport'
        })
      })
    }

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(syncItemOffsets)
        : null

    resizeObserver?.observe(root)
    stackItems.forEach((item) => resizeObserver?.observe(item))

    window.addEventListener('resize', syncItemOffsets)
    window.visualViewport?.addEventListener('resize', syncItemOffsets)

    syncItemOffsets()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', syncItemOffsets)
      window.visualViewport?.removeEventListener('resize', syncItemOffsets)
    }
  }, [items.length])

  return (
    <div className={rootClassName} data-scroll-stack ref={rootRef}>
      {items.map((item, index) => (
        <div
          className="scroll-stack__item"
          data-scroll-stack-item
          data-stack-index={index + 1}
          key={index}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
