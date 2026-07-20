'use client'

import { useEffect } from 'react'

import styles from '@/app/(frontend)/styles/pages/blog-article.module.scss'

export function BlogArticleReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-article-reveal]'))

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(styles.articleRevealVisible)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    targets.forEach((target) => {
      target.classList.add(styles.articleReveal)
      observer.observe(target)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
