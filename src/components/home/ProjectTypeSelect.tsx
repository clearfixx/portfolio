'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, SVGProps } from 'react'

const projectTypeOptions = [
  { value: 'website', label: 'Website' },
  { value: 'web-app', label: 'Web App' },
  { value: 'architecture', label: 'Architecture Review' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'other', label: 'Other' },
] as const

function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </svg>
  )
}

export function ProjectTypeSelect() {
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const labelId = useId()
  const valueId = useId()
  const listboxId = useId()

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const selectedIndex = projectTypeOptions.findIndex((option) => option.value === value)
  const selectedOption = selectedIndex >= 0 ? projectTypeOptions[selectedIndex] : null

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current

      if (!root || !(event.target instanceof Node) || root.contains(event.target)) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  const openListbox = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const closeListbox = () => {
    setIsOpen(false)
  }

  const selectOption = (index: number) => {
    const option = projectTypeOptions[index]

    if (!option) {
      return
    }

    setValue(option.value)
    setActiveIndex(index)
    closeListbox()

    window.requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }

  const moveActiveOption = (direction: 1 | -1) => {
    setActiveIndex((currentIndex) => {
      const optionCount = projectTypeOptions.length
      return (currentIndex + direction + optionCount) % optionCount
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()

        if (!isOpen) {
          openListbox()
          return
        }

        moveActiveOption(1)
        return

      case 'ArrowUp':
        event.preventDefault()

        if (!isOpen) {
          openListbox()
          return
        }

        moveActiveOption(-1)
        return

      case 'Home':
        if (!isOpen) {
          return
        }

        event.preventDefault()
        setActiveIndex(0)
        return

      case 'End':
        if (!isOpen) {
          return
        }

        event.preventDefault()
        setActiveIndex(projectTypeOptions.length - 1)
        return

      case 'Enter':
      case ' ':
        event.preventDefault()

        if (isOpen) {
          selectOption(activeIndex)
          return
        }

        openListbox()
        return

      case 'Escape':
        if (!isOpen) {
          return
        }

        event.preventDefault()
        closeListbox()
        return

      case 'Tab':
        closeListbox()
        return

      default:
        break
    }

    if (
      event.key.length !== 1 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return
    }

    const query = event.key.toLocaleLowerCase()
    const matchingIndex = projectTypeOptions.findIndex((option) =>
      option.label.toLocaleLowerCase().startsWith(query),
    )

    if (matchingIndex < 0) {
      return
    }

    event.preventDefault()
    setActiveIndex(matchingIndex)

    if (!isOpen) {
      setIsOpen(true)
    }
  }

  const activeDescendant = isOpen
    ? `${listboxId}-option-${activeIndex}`
    : undefined

  return (
    <div
      ref={rootRef}
      className={`contact-cta__field contact-cta__select${isOpen ? ' is-open' : ''}`}
    >
      <span className="contact-cta__field-icon" aria-hidden="true">
        <LayersIcon />
      </span>

      <span id={labelId} className="sr-only">
        Project Type
      </span>

      <input type="hidden" name="projectType" value={value} />

      <button
        ref={triggerRef}
        className="contact-cta__select-trigger"
        type="button"
        role="combobox"
        aria-autocomplete="none"
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-activedescendant={activeDescendant}
        aria-labelledby={`${labelId} ${valueId}`}
        onClick={() => {
          if (isOpen) {
            closeListbox()
            return
          }

          openListbox()
        }}
        onKeyDown={handleKeyDown}
      >
        <span
          id={valueId}
          className="contact-cta__select-value"
          data-placeholder={selectedOption ? undefined : 'true'}
        >
          {selectedOption?.label ?? 'Project Type'}
        </span>

        <span className="contact-cta__select-chevron" aria-hidden="true" />
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          className="contact-cta__select-list"
          role="listbox"
          aria-labelledby={labelId}
        >
          {projectTypeOptions.map((option, index) => {
            const isSelected = option.value === value
            const isActive = index === activeIndex

            return (
              <li
                id={`${listboxId}-option-${index}`}
                key={option.value}
                className="contact-cta__select-option"
                role="option"
                aria-selected={isSelected}
                data-active={isActive ? 'true' : undefined}
                onPointerDown={(event) => {
                  event.preventDefault()
                  selectOption(index)
                }}
                onPointerEnter={() => {
                  setActiveIndex(index)
                }}
              >
                <span>{option.label}</span>
                <span className="contact-cta__select-check" aria-hidden="true">
                  ✓
                </span>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
