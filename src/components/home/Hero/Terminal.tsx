'use client'

import { useEffect, useMemo, useState } from 'react'

const bootLines = [
  'Booting developer environment...',
  'Loading Next.js interface...',
  'Connecting Payload CMS...',
  'Syncing project telemetry...',
  'Initializing mission control...',
]

function getInitialCompletedLines() {
  if (typeof window === 'undefined') return []
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? bootLines : []
}

export function Terminal() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [completedLines, setCompletedLines] = useState<string[]>(getInitialCompletedLines)

  const currentLine = bootLines[lineIndex] ?? ''
  const typedLine = useMemo(() => currentLine.slice(0, charIndex), [charIndex, currentLine])
  const isComplete = completedLines.length === bootLines.length

  useEffect(() => {
    if (isComplete) return

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
      charIndex < currentLine.length ? 28 : 320,
    )

    return () => window.clearTimeout(timeout)
  }, [charIndex, currentLine, isComplete])

  return (
    <div className="hero-terminal">
      <div className="hero-card__header">
        <span>System Status</span>
        <strong>Online</strong>
      </div>

      <div className="hero-terminal__body">
        {completedLines.map((line) => (
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
          100% <strong>{isComplete ? 'Ready' : 'Loading'}</strong>
        </span>
        <div>
          <i style={{ width: `${isComplete ? 100 : completedLines.length * 20}%` }} />
        </div>
      </div>
    </div>
  )
}
