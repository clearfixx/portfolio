'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

type DeliveryPipelineMotionProps = {
  children: ReactNode
  className?: string
}

const PIPELINE_MODE_QUERY =
  '(min-width: 1281px) and (min-height: 760px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const PHASE_COUNT = 5
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const parseLength = (value: string) => {
  const parsed = Number.parseFloat(value)

  return Number.isFinite(parsed) ? parsed : 0
}

export function DeliveryPipelineMotion({
  children,
  className,
}: DeliveryPipelineMotionProps) {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current

    if (!scene) {
      return
    }

    const stage = scene.querySelector<HTMLElement>('[data-pipeline-stage]')
    const rail = scene.querySelector<HTMLElement>('[data-pipeline-rail]')
    const radarSweep = scene.querySelector<HTMLElement>(
      '[data-pipeline-radar-sweep]',
    )
    const velocityBar = scene.querySelector<HTMLElement>(
      '[data-pipeline-velocity-bar]',
    )
    const nodes = Array.from(
      scene.querySelectorAll<HTMLElement>('[data-pipeline-node]'),
    )
    const phases = Array.from(
      scene.querySelectorAll<HTMLElement>('[data-pipeline-phase]'),
    )

    if (
      !stage ||
      !rail ||
      !radarSweep ||
      !velocityBar ||
      nodes.length !== PHASE_COUNT ||
      phases.length !== PHASE_COUNT
    ) {
      return
    }

    const modeQuery = window.matchMedia(PIPELINE_MODE_QUERY)

    let animationFrame = 0
    let geometryDirty = true
    let sceneIsNearViewport = true
    let resolvedTop = 0
    let activeStep = -1
    let lastProgressValue = ''

    const setPhaseState = (step: number) => {
      if (step === activeStep) {
        return
      }

      activeStep = step
      scene.dataset.pipelineStep = String(step)

      phases.forEach((phase, index) => {
        phase.dataset.pipelineState =
          index < step ? 'complete' : index === step ? 'active' : 'upcoming'
      })

      nodes.forEach((node, index) => {
        node.dataset.pipelineState =
          index < step ? 'complete' : index === step ? 'active' : 'upcoming'
      })
    }

    const resetScene = () => {
      scene.dataset.pipelineEnabled = 'false'
      delete scene.dataset.pipelineStep
      stage.style.removeProperty('--pipeline-sticky-top')
      rail.style.removeProperty('--pipeline-progress')
      radarSweep.style.removeProperty('transform')
      velocityBar.style.removeProperty('transform')

      phases.forEach((phase) => {
        phase.dataset.pipelineState = 'active'
      })

      nodes.forEach((node) => {
        node.dataset.pipelineState = 'active'
      })

      activeStep = -1
      lastProgressValue = ''
      geometryDirty = true
    }

    const syncGeometry = () => {
      const sceneStyles = window.getComputedStyle(scene)
      const desiredTop = parseLength(
        sceneStyles.getPropertyValue('--pipeline-sticky-top'),
      )
      const bottomGap = parseLength(
        sceneStyles.getPropertyValue('--pipeline-sticky-bottom-gap'),
      )
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight
      const fullyVisibleTop = viewportHeight - stage.offsetHeight - bottomGap

      resolvedTop = Math.min(desiredTop, fullyVisibleTop)

      stage.style.setProperty(
        '--pipeline-sticky-top',
        `${Math.round(resolvedTop)}px`,
      )

      geometryDirty = false
    }

    const syncProgress = () => {
      if (!modeQuery.matches) {
        return
      }

      scene.dataset.pipelineEnabled = 'true'

      if (geometryDirty) {
        syncGeometry()
      }

      const sceneRect = scene.getBoundingClientRect()
      const scrollRange = Math.max(1, scene.offsetHeight - stage.offsetHeight)
      const progress = clamp(
        (resolvedTop - sceneRect.top) / scrollRange,
        0,
        1,
      )
      const progressValue = progress.toFixed(4)

      if (progressValue !== lastProgressValue) {
        lastProgressValue = progressValue
        rail.style.setProperty('--pipeline-progress', progressValue)
        radarSweep.style.transform = `rotate(${(progress * 720).toFixed(2)}deg)`
        velocityBar.style.transform = `scaleX(${(progress * 0.92).toFixed(4)})`
      }

      const nextStep = Math.min(
        PHASE_COUNT - 1,
        Math.floor(progress * PHASE_COUNT),
      )

      setPhaseState(nextStep)
    }

    const update = () => {
      animationFrame = 0

      if (!sceneIsNearViewport) {
        return
      }

      syncProgress()
    }

    const scheduleUpdate = (withGeometry = false) => {
      geometryDirty = geometryDirty || withGeometry

      if (animationFrame !== 0) {
        return
      }

      animationFrame = requestAnimationFrame(update)
    }

    const handleScroll = () => scheduleUpdate()
    const handleResize = () => scheduleUpdate(true)
    const handleModeChange = () => {
      scene.dataset.pipelineRuntime =
        sceneIsNearViewport && modeQuery.matches
          ? 'active'
          : 'idle'

      if (!modeQuery.matches) {
        resetScene()
      }

      scheduleUpdate(true)
    }

    const resizeObserver =
      'ResizeObserver' in window
        ? new ResizeObserver(() => scheduleUpdate(true))
        : null

    resizeObserver?.observe(scene)
    resizeObserver?.observe(stage)

    const visibilityObserver =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              sceneIsNearViewport = entry?.isIntersecting ?? true
              scene.dataset.pipelineRuntime =
                sceneIsNearViewport && modeQuery.matches ? 'active' : 'idle'

              if (sceneIsNearViewport) {
                scheduleUpdate()
              }
            },
            {
              rootMargin: '100% 0px 100% 0px',
            },
          )
        : null

    visibilityObserver?.observe(scene)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)
    modeQuery.addEventListener('change', handleModeChange)

    scene.dataset.pipelineRuntime = modeQuery.matches ? 'active' : 'idle'
    if (modeQuery.matches) {
      scheduleUpdate(true)
    } else {
      resetScene()
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
      modeQuery.removeEventListener('change', handleModeChange)
    }
  }, [])

  return (
    <div
      className="delivery-pipeline-scroll"
      data-pipeline-enabled="false"
      data-pipeline-runtime="idle"
      data-pipeline-scroll
      ref={sceneRef}
    >
      <div className={className} data-pipeline-stage>
        {children}
      </div>
    </div>
  )
}
