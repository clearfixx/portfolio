'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const bootLines = [
  'Booting developer environment...',
  'Loading Next.js interface...',
  'Connecting Payload CMS...',
  'Syncing project telemetry...',
  'Initializing mission control...',
]

const TYPE_SPEED_MS = 28
const LINE_COMPLETE_DELAY_MS = 320
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)

  mediaQuery.addEventListener('change', callback)

  return () => {
    mediaQuery.removeEventListener('change', callback)
  }
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false

  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export function Terminal() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )

  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [completedLines, setCompletedLines] = useState<string[]>([])

  const currentLine = bootLines[lineIndex] ?? ''
  const typedLine = currentLine.slice(0, charIndex)

  const visibleCompletedLines = prefersReducedMotion ? bootLines : completedLines
  const isComplete = prefersReducedMotion || completedLines.length === bootLines.length

  const currentLineProgress = currentLine.length > 0 ? charIndex / currentLine.length : 0
  const progress = isComplete
    ? 100
    : Math.round(((completedLines.length + currentLineProgress) / bootLines.length) * 100)

  useEffect(() => {
    if (prefersReducedMotion || isComplete) return

    const timeout = window.setTimeout(
      () => {
        if (charIndex < currentLine.length) {
          setCharIndex((value) => value + 1)
          return
        }

        setCompletedLines((lines) => [...lines, currentLine])
        setLineIndex((value) => value + 1)
        setCharIndex(0)
      },
      charIndex < currentLine.length ? TYPE_SPEED_MS : LINE_COMPLETE_DELAY_MS,
    )

    return () => {
      window.clearTimeout(timeout)
    }
  }, [charIndex, currentLine, isComplete, prefersReducedMotion])

  return (
    <div className="hero-terminal" aria-label="System boot sequence">
      <div className="hero-card__header">
        <span>System Status</span>
        <strong>Online</strong>
      </div>

      <div className="hero-terminal__body">
        {visibleCompletedLines.map((line) => (
          <p key={line}>
            <span>&gt;</span> {line} <strong>[ OK ]</strong>
          </p>
        ))}

        {!isComplete && (
          <p>
            <span>&gt;</span> {typedLine}
            <i aria-hidden="true" />
          </p>
        )}

        {isComplete && <p className="hero-terminal__welcome">Welcome, visitor! 👋</p>}
      </div>

      <div className="hero-terminal__footer">
        <span>
          {progress}% <strong>{isComplete ? 'Ready' : 'Loading'}</strong>
        </span>

        <div>
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
