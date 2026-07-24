'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type StreamedMotionBoundaryProps = {
  children: ReactNode
}

// public-pages-consistency-runtime-skeletons-v1-8

export function StreamedMotionBoundary({ children }: StreamedMotionBoundaryProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    root.dataset.motionHydrated = 'true'
  }, [])

  return (
    <div className="streamed-motion-boundary" data-motion-hydrated="false" ref={rootRef}>
      {children}
    </div>
  )
}
