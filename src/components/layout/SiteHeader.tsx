'use client'

import { useEffect, useState } from 'react'

import { Logo } from '@/components/brand'
import { Navbar } from '@/components/navigation'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 76)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-container site-header__inner">
        <Logo />
        <Navbar />
      </div>
    </header>
  )
}
