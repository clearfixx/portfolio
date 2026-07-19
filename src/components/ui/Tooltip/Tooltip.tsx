'use client'

import { createPortal } from 'react-dom'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

type TooltipState = {
  placement: TooltipPlacement
  target: HTMLElement
  title: string
}

const SELECTOR = '[data-toggle="tooltip"], [data-toogle="tooltip"]'
const GAP = 11
const EDGE = 10

function getTrigger(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null
  }

  const trigger = target.closest(SELECTOR)

  if (!(trigger instanceof HTMLElement)) {
    return null
  }

  return (trigger.dataset.toggle ?? trigger.dataset.toogle) === 'tooltip' ? trigger : null
}

function getPlacement(target: HTMLElement): TooltipPlacement {
  const value = target.dataset.placement

  return value === 'top' || value === 'right' || value === 'bottom' || value === 'left'
    ? value
    : 'top'
}

function getDelay(value?: string) {
  if (!value) {
    return 0
  }

  const normalized = value.trim().toLowerCase()
  const amount = Number.parseFloat(normalized)

  if (!Number.isFinite(amount)) {
    return 0
  }

  if (normalized.endsWith('ms')) {
    return Math.max(0, amount)
  }

  if (normalized.endsWith('s')) {
    return Math.max(0, amount * 1000)
  }

  return Math.max(0, amount)
}

function sanitizeHtml(value: string) {
  const parser = new DOMParser()
  const parsedDocument = parser.parseFromString(value, 'text/html')
  const allowed = new Set(['BR', 'CODE', 'EM', 'SPAN', 'STRONG'])
  const blocked = new Set(['IFRAME', 'OBJECT', 'SCRIPT', 'STYLE', 'TEMPLATE'])

  const clean = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (!(child instanceof HTMLElement)) {
        continue
      }

      if (blocked.has(child.tagName)) {
        child.remove()
        continue
      }

      if (!allowed.has(child.tagName)) {
        child.replaceWith(parsedDocument.createTextNode(child.textContent ?? ''))
        continue
      }

      for (const attribute of [...child.attributes]) {
        child.removeAttribute(attribute.name)
      }

      clean(child)
    }
  }

  clean(parsedDocument.body)

  return parsedDocument.body.innerHTML
}

function opposite(placement: TooltipPlacement): TooltipPlacement {
  const values: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }

  return values[placement]
}

function calculate(target: DOMRect, tooltip: DOMRect, placement: TooltipPlacement) {
  if (placement === 'right') {
    return {
      left: target.right + GAP,
      top: target.top + target.height / 2 - tooltip.height / 2,
    }
  }

  if (placement === 'bottom') {
    return {
      left: target.left + target.width / 2 - tooltip.width / 2,
      top: target.bottom + GAP,
    }
  }

  if (placement === 'left') {
    return {
      left: target.left - tooltip.width - GAP,
      top: target.top + target.height / 2 - tooltip.height / 2,
    }
  }

  return {
    left: target.left + target.width / 2 - tooltip.width / 2,
    top: target.top - tooltip.height - GAP,
  }
}

function fits(position: { left: number; top: number }, tooltip: DOMRect) {
  return (
    position.left >= EDGE &&
    position.top >= EDGE &&
    position.left + tooltip.width <= window.innerWidth - EDGE &&
    position.top + tooltip.height <= window.innerHeight - EDGE
  )
}

function clamp(position: { left: number; top: number }, tooltip: DOMRect) {
  return {
    left: Math.min(
      Math.max(position.left, EDGE),
      Math.max(EDGE, window.innerWidth - tooltip.width - EDGE),
    ),
    top: Math.min(
      Math.max(position.top, EDGE),
      Math.max(EDGE, window.innerHeight - tooltip.height - EDGE),
    ),
  }
}

export function Tooltip() {
  const id = useId()
  const tooltipRef = useRef<HTMLDivElement>(null)
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousDescribedBy = useRef<string | null>(null)
  const [active, setActive] = useState<TooltipState | null>(null)

  const clearTimers = useCallback(() => {
    if (showTimer.current) {
      clearTimeout(showTimer.current)
    }

    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
    }

    showTimer.current = null
    hideTimer.current = null
  }, [])

  const restoreDescription = useCallback((target?: HTMLElement) => {
    if (!target) {
      return
    }

    if (previousDescribedBy.current) {
      target.setAttribute('aria-describedby', previousDescribedBy.current)
    } else {
      target.removeAttribute('aria-describedby')
    }

    previousDescribedBy.current = null
  }, [])

  const close = useCallback(
    (delay = 0) => {
      if (showTimer.current) {
        clearTimeout(showTimer.current)
      }

      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
      }

      showTimer.current = null
      hideTimer.current = setTimeout(() => {
        setActive((current) => {
          restoreDescription(current?.target)
          return null
        })
        hideTimer.current = null
      }, delay)
    },
    [restoreDescription],
  )

  const open = useCallback(
    (target: HTMLElement) => {
      const title = target.dataset.tooltipTitle?.trim()

      if (!title) {
        return
      }

      clearTimers()

      showTimer.current = setTimeout(() => {
        setActive((current) => {
          if (current?.target !== target) {
            restoreDescription(current?.target)
            previousDescribedBy.current = target.getAttribute('aria-describedby')
          }

          target.setAttribute('aria-describedby', id)

          return {
            placement: getPlacement(target),
            target,
            title,
          }
        })
        showTimer.current = null
      }, getDelay(target.dataset.tooltipDelay))
    },
    [clearTimers, id, restoreDescription],
  )

  const positionTooltip = useCallback(() => {
    const tooltip = tooltipRef.current

    if (!active || !tooltip) {
      return
    }

    const targetRect = active.target.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()
    let placement = active.placement
    let position = calculate(targetRect, tooltipRect, placement)

    if (!fits(position, tooltipRect)) {
      const flipped = opposite(placement)
      const flippedPosition = calculate(targetRect, tooltipRect, flipped)

      if (fits(flippedPosition, tooltipRect)) {
        placement = flipped
        position = flippedPosition
      }
    }

    const safePosition = clamp(position, tooltipRect)

    tooltip.classList.remove(
      'ui-tooltip--top',
      'ui-tooltip--right',
      'ui-tooltip--bottom',
      'ui-tooltip--left',
    )
    tooltip.classList.add(`ui-tooltip--${placement}`)
    tooltip.style.left = `${safePosition.left}px`
    tooltip.style.top = `${safePosition.top}px`
    tooltip.style.visibility = 'visible'
  }, [active])

  useEffect(() => {
    const pointerOver = (event: PointerEvent) => {
      const trigger = getTrigger(event.target)

      if (
        !trigger ||
        (event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget))
      ) {
        return
      }

      open(trigger)
    }

    const pointerOut = (event: PointerEvent) => {
      const trigger = getTrigger(event.target)

      if (
        !trigger ||
        (event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget))
      ) {
        return
      }

      close(80)
    }

    const focusIn = (event: FocusEvent) => {
      const trigger = getTrigger(event.target)

      if (trigger) {
        open(trigger)
      }
    }

    const focusOut = (event: FocusEvent) => {
      const trigger = getTrigger(event.target)

      if (
        trigger &&
        !(event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget))
      ) {
        close()
      }
    }

    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('pointerover', pointerOver)
    document.addEventListener('pointerout', pointerOut)
    document.addEventListener('focusin', focusIn)
    document.addEventListener('focusout', focusOut)
    document.addEventListener('keydown', keyDown)

    return () => {
      document.removeEventListener('pointerover', pointerOver)
      document.removeEventListener('pointerout', pointerOut)
      document.removeEventListener('focusin', focusIn)
      document.removeEventListener('focusout', focusOut)
      document.removeEventListener('keydown', keyDown)
      clearTimers()
    }
  }, [clearTimers, close, open])

  useLayoutEffect(() => {
    positionTooltip()
  }, [positionTooltip])

  useEffect(() => {
    if (!active) {
      return
    }

    window.addEventListener('resize', positionTooltip)
    window.addEventListener('scroll', positionTooltip, true)

    return () => {
      window.removeEventListener('resize', positionTooltip)
      window.removeEventListener('scroll', positionTooltip, true)
    }
  }, [active, positionTooltip])

  if (!active || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className={`ui-tooltip ui-tooltip--${active.placement}`}
      id={id}
      ref={tooltipRef}
      role="tooltip"
      style={{
        left: 0,
        top: 0,
        visibility: 'hidden',
      }}
    >
      <span
        className="ui-tooltip__content"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(active.title),
        }}
      />
      <span aria-hidden="true" className="ui-tooltip__arrow" />
    </div>,
    document.body,
  )
}
