'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './SiteHeaderClient.module.scss'

import { Logo } from '@/components/brand'
import { Navbar } from '@/components/navigation'
import type { NavigationViewModel } from '@/lib/cms/navigation'

type SiteHeaderClientProps = {
  navigation: NavigationViewModel
}

export function SiteHeaderClient({ navigation }: SiteHeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 76)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const getScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

      if (scrollableHeight <= 0) return 0

      return Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
    }

    const updateScrollProgress = () => {
      window.cancelAnimationFrame(frameRef.current)

      frameRef.current = window.requestAnimationFrame(() => {
        setScrollProgress(getScrollProgress())
      })
    }

    updateScrollProgress()

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressBar} style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <div className={`site-container ${styles.inner}`}>
        <Logo />
        <Navbar navigation={navigation} />
      </div>
    </header>
  )
}
