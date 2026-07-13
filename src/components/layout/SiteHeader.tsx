'use client'

import { useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/brand'
import { Navbar } from '@/components/navigation'

export function SiteHeader() {
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
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__progress" aria-hidden="true">
        <span
          className="site-header__progress-bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      <div className="site-container site-header__inner">
        <Logo />
        <Navbar />
      </div>
    </header>
  )
}
