'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from 'react'

import styles from '@/app/(frontend)/styles/pages/blog.module.scss'

type FilterOption = {
  label: string
  slug: string
}

type BlogArticleFiltersProps = {
  categories: FilterOption[]
  initialQuery?: string
  initialSeries?: string
  initialTopic?: string
  selectedSort: 'latest' | 'popular' | 'updated'
  series: FilterOption[]
}

type FilterIconName = 'chevron' | 'search' | 'sliders'

function FilterIcon({ name }: { name: FilterIconName }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.icon}
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {name === 'search' ? (
          <>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </>
        ) : name === 'sliders' ? (
          <>
            <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5" />
            <circle cx="16" cy="6" r="2" />
            <circle cx="8" cy="12" r="2" />
            <circle cx="13" cy="18" r="2" />
          </>
        ) : (
          <path d="m7 9 5 5 5-5" />
        )}
      </g>
    </svg>
  )
}

type FilterSelectProps = {
  allLabel: string
  ariaLabel: string
  name: string
  onChange: (value: string) => void
  options: FilterOption[]
  value: string
}

function FilterSelect({ allLabel, ariaLabel, name, onChange, options, value }: FilterSelectProps) {
  const buttonId = useId()
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = options.find((option) => option.slug === value)?.label ?? allLabel

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        document.getElementById(buttonId)?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [buttonId, isOpen])

  const selectValue = (
    nextValue: string,
    event: ReactMouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    onChange(nextValue)
    setIsOpen(false)
    document.getElementById(buttonId)?.focus()
  }

  return (
    <div className={styles.filterSelect} ref={rootRef}>
      <input name={name} type="hidden" value={value} />

      <button
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className={styles.filterSelectButton}
        id={buttonId}
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span>{selectedLabel}</span>
        <span className={styles.filterSelectChevron}>
          <FilterIcon name="chevron" />
        </span>
      </button>

      {isOpen ? (
        <div
          aria-labelledby={buttonId}
          className={styles.filterSelectMenu}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
        >
          <button
            aria-selected={value === ''}
            className={styles.filterSelectOption}
            onClick={(event) => selectValue('', event)}
            role="option"
            type="button"
          >
            <span>{allLabel}</span>
            <i aria-hidden="true" />
          </button>

          {options.map((option) => (
            <button
              aria-selected={value === option.slug}
              className={styles.filterSelectOption}
              key={option.slug}
              onClick={(event) => selectValue(option.slug, event)}
              role="option"
              type="button"
            >
              <span>{option.label}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function BlogArticleFilters({
  categories,
  initialQuery = '',
  initialSeries = '',
  initialTopic = '',
  selectedSort,
  series,
}: BlogArticleFiltersProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [selectedSeries, setSelectedSeries] = useState(initialSeries)
  const [selectedTopic, setSelectedTopic] = useState(initialTopic)
  const [isPending, startTransition] = useTransition()

  const submitFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextParams = new URLSearchParams(searchParams.toString())
    const normalizedQuery = query.trim()

    const updateParam = (key: string, value: string) => {
      if (value) {
        nextParams.set(key, value)
      } else {
        nextParams.delete(key)
      }
    }

    updateParam('q', normalizedQuery)
    updateParam('topic', selectedTopic)
    updateParam('series', selectedSeries)
    nextParams.set('sort', selectedSort)
    nextParams.delete('page')

    const nextQuery = nextParams.toString()
    const destination = nextQuery ? `${pathname}?${nextQuery}` : pathname

    startTransition(() => {
      router.push(destination, { scroll: false })
    })
  }

  return (
    <form className={styles.filters} onSubmit={submitFilters}>
      <label className={styles.search}>
        <span className={styles.srOnly}>Search articles</span>
        <FilterIcon name="search" />
        <input
          autoComplete="off"
          name="q"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles..."
          type="search"
          value={query}
        />
      </label>

      <FilterSelect
        allLabel="All topics"
        ariaLabel="Filter by topic"
        name="topic"
        onChange={setSelectedTopic}
        options={categories}
        value={selectedTopic}
      />

      <FilterSelect
        allLabel="All series"
        ariaLabel="Filter by series"
        name="series"
        onChange={setSelectedSeries}
        options={series}
        value={selectedSeries}
      />

      <button disabled={isPending} type="submit">
        <FilterIcon name="sliders" />
        {isPending ? 'Applying…' : 'Apply'}
      </button>
    </form>
  )
}
