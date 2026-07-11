'use client'

import type { MouseEvent } from 'react'

export function SkipLink() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById('main-content')

    if (!target) {
      return
    }

    event.preventDefault()

    target.scrollIntoView({
      block: 'start',
      behavior: 'auto',
    })

    target.focus({ preventScroll: true })
    window.history.replaceState(null, '', '#main-content')
  }

  return (
    <a className="skip-link" href="#main-content" onClick={handleClick}>
      Skip to main content
    </a>
  )
}
