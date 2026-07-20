'use client'

import { useEffect, useMemo, useState } from 'react'

import styles from '@/app/(frontend)/blog/[slug]/article.module.scss'

type BlogArticleTocItem = {
  id: string
  label: string
}

type BlogArticleTocProps = {
  items: BlogArticleTocItem[]
}

export function BlogArticleToc({ items }: BlogArticleTocProps) {
  const validItems = useMemo(() => items.filter((item) => item.id && item.label), [items])
  const [activeId, setActiveId] = useState(validItems[0]?.id ?? '')

  useEffect(() => {
    const sections = validItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)

        const nextActive = visibleEntries[0]?.target.id

        if (nextActive) {
          setActiveId(nextActive)
        }
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [validItems])

  return (
    <nav className={styles.toc} aria-label="On this page">
      <p>On this page</p>

      <div className={styles.tocList}>
        {validItems.map((item) => {
          const isActive = activeId === item.id

          return (
            <a
              aria-current={isActive ? 'location' : undefined}
              className={isActive ? styles.tocLinkActive : undefined}
              href={`#${item.id}`}
              key={item.id}
            >
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
