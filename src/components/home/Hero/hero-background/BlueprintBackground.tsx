'use client'

import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
}

type RouteNode = Point & {
  core: boolean
  phase: number
  routeProgress: number
}

type RouteSegment = {
  from: Point
  to: Point
  length: number
  start: number
}

type BlueprintRoute = {
  nodes: RouteNode[]
  segments: RouteSegment[]
  routeLength: number
  intensity: number
  constructionDelay: number
}

type RouteLayout = {
  points: Point[]
  intensity: number
  constructionDelay: number
}

type BlueprintPalette = {
  minorGrid: string
  majorGrid: string
  route: string
  routeActive: string
  node: string
  nodeCore: string
  signalCyan: string
  signalCyanGlow: string
  signalPurple: string
  signalPurpleGlow: string
}

type IntroStage = 'boot' | 'construct' | 'pulse' | 'ambient'

type IntroFrame = {
  stage: IntroStage
  gridOpacity: number
  scanProgress: number
  guideOpacity: number
  constructionProgress: number
  commissioningPulse: number | null
  ambientMix: number
}

type SignalStyle = {
  color: string
  glow: string
}

const DESKTOP_FPS = 30
const MOBILE_FPS = 24
const DESKTOP_DPR = 1.35
const MOBILE_DPR = 1.15
const MOBILE_BREAKPOINT = 768

const INTRO_BOOT_DELAY = 180
const INTRO_GRID_END = 900
const INTRO_CONSTRUCT_START = 430
const INTRO_CONSTRUCT_END = 2280
const INTRO_PULSE_START = 2240
const INTRO_PULSE_END = 3180
const INTRO_AMBIENT_START = 2940
const INTRO_END = 3480

const AMBIENT_SIGNAL_INTERVAL = 3400
const AMBIENT_SIGNAL_DURATION = 10800
const AMBIENT_SIGNAL_HISTORY = 4
const SIGNAL_TAIL_LENGTH = 0.045
const SIGNAL_TAIL_STEPS = 7
const NODE_FLASH_WINDOW = 0.026

const ROUTE_LAYOUTS: RouteLayout[] = [
  {
    intensity: 1,
    constructionDelay: 0,
    points: [
      { x: 0.015, y: 0.2 },
      { x: 0.12, y: 0.2 },
      { x: 0.12, y: 0.34 },
      { x: 0.27, y: 0.34 },
      { x: 0.27, y: 0.22 },
      { x: 0.42, y: 0.22 },
      { x: 0.42, y: 0.43 },
      { x: 0.58, y: 0.43 },
      { x: 0.58, y: 0.29 },
      { x: 0.73, y: 0.29 },
      { x: 0.73, y: 0.53 },
      { x: 0.88, y: 0.53 },
      { x: 0.88, y: 0.38 },
      { x: 0.985, y: 0.38 },
    ],
  },
  {
    intensity: 0.68,
    constructionDelay: 0.09,
    points: [
      { x: 0.01, y: 0.1 },
      { x: 0.09, y: 0.1 },
      { x: 0.09, y: 0.16 },
      { x: 0.23, y: 0.16 },
      { x: 0.23, y: 0.08 },
      { x: 0.38, y: 0.08 },
      { x: 0.38, y: 0.18 },
      { x: 0.54, y: 0.18 },
      { x: 0.54, y: 0.11 },
      { x: 0.69, y: 0.11 },
      { x: 0.69, y: 0.23 },
      { x: 0.84, y: 0.23 },
      { x: 0.84, y: 0.14 },
      { x: 0.99, y: 0.14 },
    ],
  },
  {
    intensity: 0.62,
    constructionDelay: 0.17,
    points: [
      { x: 0.01, y: 0.73 },
      { x: 0.11, y: 0.73 },
      { x: 0.11, y: 0.59 },
      { x: 0.24, y: 0.59 },
      { x: 0.24, y: 0.77 },
      { x: 0.4, y: 0.77 },
      { x: 0.4, y: 0.64 },
      { x: 0.56, y: 0.64 },
      { x: 0.56, y: 0.81 },
      { x: 0.71, y: 0.81 },
      { x: 0.71, y: 0.68 },
      { x: 0.86, y: 0.68 },
      { x: 0.86, y: 0.79 },
      { x: 0.99, y: 0.79 },
    ],
  },
]

const DARK_PALETTE: BlueprintPalette = {
  minorGrid: 'rgba(105, 239, 255, 0.028)',
  majorGrid: 'rgba(105, 239, 255, 0.064)',
  route: 'rgba(105, 239, 255, 0.105)',
  routeActive: 'rgba(105, 239, 255, 0.24)',
  node: 'rgba(105, 239, 255, 0.34)',
  nodeCore: 'rgba(168, 85, 247, 0.56)',
  signalCyan: 'rgba(105, 239, 255, 0.96)',
  signalCyanGlow: 'rgba(105, 239, 255, 0.64)',
  signalPurple: 'rgba(168, 85, 247, 0.96)',
  signalPurpleGlow: 'rgba(168, 85, 247, 0.62)',
}

const LIGHT_PALETTE: BlueprintPalette = {
  minorGrid: 'rgba(18, 86, 110, 0.038)',
  majorGrid: 'rgba(18, 86, 110, 0.075)',
  route: 'rgba(0, 112, 132, 0.12)',
  routeActive: 'rgba(0, 131, 153, 0.24)',
  node: 'rgba(0, 117, 137, 0.38)',
  nodeCore: 'rgba(126, 63, 198, 0.48)',
  signalCyan: 'rgba(0, 111, 132, 0.84)',
  signalCyanGlow: 'rgba(0, 149, 171, 0.36)',
  signalPurple: 'rgba(126, 63, 198, 0.82)',
  signalPurpleGlow: 'rgba(126, 63, 198, 0.34)',
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function progressBetween(time: number, start: number, end: number) {
  return clamp01((time - start) / Math.max(1, end - start))
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - clamp01(value), 3)
}

function easeInOutCubic(value: number) {
  const progress = clamp01(value)

  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2
}

function getIntroFrame(elapsed: number, reducedMotion: boolean): IntroFrame {
  if (reducedMotion) {
    return {
      stage: 'ambient',
      gridOpacity: 1,
      scanProgress: 1,
      guideOpacity: 1,
      constructionProgress: 1,
      commissioningPulse: null,
      ambientMix: 1,
    }
  }

  const gridProgress = progressBetween(elapsed, INTRO_BOOT_DELAY, INTRO_GRID_END)
  const constructionProgress = easeInOutCubic(
    progressBetween(elapsed, INTRO_CONSTRUCT_START, INTRO_CONSTRUCT_END),
  )
  const pulseProgress = progressBetween(elapsed, INTRO_PULSE_START, INTRO_PULSE_END)
  const ambientMix = easeOutCubic(progressBetween(elapsed, INTRO_AMBIENT_START, INTRO_END))

  let stage: IntroStage = 'boot'

  if (elapsed >= INTRO_AMBIENT_START) {
    stage = 'ambient'
  } else if (elapsed >= INTRO_PULSE_START) {
    stage = 'pulse'
  } else if (elapsed >= INTRO_CONSTRUCT_START) {
    stage = 'construct'
  }

  return {
    stage,
    gridOpacity: easeOutCubic(gridProgress),
    scanProgress: gridProgress,
    guideOpacity: easeOutCubic(gridProgress) * (0.3 + constructionProgress * 0.7),
    constructionProgress,
    commissioningPulse:
      elapsed >= INTRO_PULSE_START && elapsed <= INTRO_PULSE_END
        ? easeInOutCubic(pulseProgress)
        : null,
    ambientMix,
  }
}

function getPalette() {
  return document.documentElement.dataset.theme === 'light' ? LIGHT_PALETTE : DARK_PALETTE
}

function buildRoute(layout: RouteLayout, width: number, height: number): BlueprintRoute {
  const points = layout.points.map((point) => ({
    x: point.x * width,
    y: point.y * height,
  }))
  const nodeDistances = [0]

  let routeLength = 0
  const segments = points.slice(0, -1).map((point, index) => {
    const next = points[index + 1]

    if (!next) {
      return {
        from: point,
        to: point,
        length: 0,
        start: routeLength,
      }
    }

    const length = Math.hypot(next.x - point.x, next.y - point.y)
    const segment = {
      from: point,
      to: next,
      length,
      start: routeLength,
    }

    routeLength += length
    nodeDistances.push(routeLength)

    return segment
  })

  const midpoint = Math.floor(points.length / 2)
  const nodes = points.map((point, index) => ({
    ...point,
    core: index === 0 || index === midpoint || index === points.length - 1,
    phase: index * 0.72,
    routeProgress: routeLength > 0 ? (nodeDistances[index] ?? 0) / routeLength : 0,
  }))

  return {
    nodes,
    segments,
    routeLength,
    intensity: layout.intensity,
    constructionDelay: layout.constructionDelay,
  }
}

function buildNetwork(width: number, height: number) {
  return ROUTE_LAYOUTS.map((layout) => buildRoute(layout, width, height))
}

function getRoutePoint(route: BlueprintRoute, progress: number, wrap = true): Point {
  const normalizedProgress = wrap ? ((progress % 1) + 1) % 1 : clamp01(progress)
  const distance = normalizedProgress * route.routeLength
  const segment =
    route.segments.find((candidate) => distance <= candidate.start + candidate.length) ??
    route.segments.at(-1)

  if (!segment || segment.length === 0) {
    return route.nodes[0] ?? { x: 0, y: 0 }
  }

  const localProgress = Math.min(1, Math.max(0, (distance - segment.start) / segment.length))

  return {
    x: segment.from.x + (segment.to.x - segment.from.x) * localProgress,
    y: segment.from.y + (segment.to.y - segment.from.y) * localProgress,
  }
}

function traceRoute(
  context: CanvasRenderingContext2D,
  route: BlueprintRoute,
  progress: number,
) {
  const firstNode = route.nodes[0]

  if (!firstNode) return

  const targetDistance = clamp01(progress) * route.routeLength

  context.beginPath()
  context.moveTo(firstNode.x, firstNode.y)

  for (const segment of route.segments) {
    const segmentEnd = segment.start + segment.length

    if (targetDistance >= segmentEnd) {
      context.lineTo(segment.to.x, segment.to.y)
      continue
    }

    if (targetDistance > segment.start && segment.length > 0) {
      const localProgress = (targetDistance - segment.start) / segment.length
      context.lineTo(
        segment.from.x + (segment.to.x - segment.from.x) * localProgress,
        segment.from.y + (segment.to.y - segment.from.y) * localProgress,
      )
    }

    break
  }
}

function getRouteConstructionProgress(route: BlueprintRoute, progress: number) {
  const availableProgress = Math.max(0.01, 1 - route.constructionDelay)

  return easeOutCubic((progress - route.constructionDelay) / availableProgress)
}

function drawGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: BlueprintPalette,
  opacity: number,
) {
  if (opacity <= 0) return

  const spacing = width <= MOBILE_BREAKPOINT ? 42 : 56
  const columns = Math.ceil(width / spacing)
  const rows = Math.ceil(height / spacing)

  context.save()
  context.globalAlpha = opacity
  context.lineWidth = 1

  for (let column = 0; column <= columns; column += 1) {
    const x = Math.round(column * spacing) + 0.5
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.strokeStyle = column % 4 === 0 ? palette.majorGrid : palette.minorGrid
    context.stroke()
  }

  for (let row = 0; row <= rows; row += 1) {
    const y = Math.round(row * spacing) + 0.5
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.strokeStyle = row % 4 === 0 ? palette.majorGrid : palette.minorGrid
    context.stroke()
  }

  context.restore()
}

function drawBootScan(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: BlueprintPalette,
  frame: IntroFrame,
) {
  if (frame.stage === 'ambient' || frame.scanProgress <= 0 || frame.scanProgress >= 1) return

  const y = height * frame.scanProgress
  const gradient = context.createLinearGradient(0, y - 28, 0, y + 28)

  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.5, palette.signalCyanGlow)
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  context.save()
  context.globalAlpha = 0.34 * (1 - frame.scanProgress * 0.45)
  context.fillStyle = gradient
  context.fillRect(0, y - 28, width, 56)
  context.restore()
}

function drawRoute(
  context: CanvasRenderingContext2D,
  route: BlueprintRoute,
  palette: BlueprintPalette,
  time: number,
  animated: boolean,
  frame: IntroFrame,
) {
  const firstNode = route.nodes[0]
  const constructionProgress = getRouteConstructionProgress(
    route,
    frame.constructionProgress,
  )

  if (!firstNode || frame.guideOpacity <= 0) return

  context.save()
  context.lineCap = 'round'
  context.lineJoin = 'round'

  traceRoute(context, route, 1)
  context.globalAlpha = frame.guideOpacity * route.intensity
  context.strokeStyle = palette.route
  context.lineWidth = 1
  context.stroke()

  if (constructionProgress > 0) {
    traceRoute(context, route, constructionProgress)
    context.globalAlpha = route.intensity
    context.strokeStyle = palette.routeActive
    context.lineWidth = 1.35
    context.stroke()

    traceRoute(context, route, constructionProgress)
    context.setLineDash([8, 18])
    context.lineDashOffset = animated ? -(time * 0.012) : 0
    context.globalAlpha = 0.9 * route.intensity
    context.strokeStyle = palette.routeActive
    context.lineWidth = 1
    context.stroke()
  }

  if (constructionProgress > 0 && constructionProgress < 1) {
    const endpoint = getRoutePoint(route, constructionProgress, false)

    context.beginPath()
    context.arc(endpoint.x, endpoint.y, 2.3, 0, Math.PI * 2)
    context.globalAlpha = 0.92 * route.intensity
    context.fillStyle = palette.signalCyan
    context.shadowColor = palette.signalCyanGlow
    context.shadowBlur = 14
    context.fill()
  }

  context.restore()
}

function drawNodes(
  context: CanvasRenderingContext2D,
  route: BlueprintRoute,
  palette: BlueprintPalette,
  time: number,
  animated: boolean,
  frame: IntroFrame,
) {
  const constructionProgress = getRouteConstructionProgress(
    route,
    frame.constructionProgress,
  )

  context.save()

  for (const node of route.nodes) {
    const routeReveal = clamp01((constructionProgress - node.routeProgress + 0.035) / 0.085)
    const reveal =
      node.routeProgress === 0
        ? Math.max(frame.gridOpacity * 0.92, routeReveal)
        : easeOutCubic(routeReveal)

    if (reveal <= 0) continue

    const activationWave = clamp01(
      1 - Math.abs(constructionProgress - node.routeProgress) / 0.065,
    )
    const ambientPulse =
      animated && frame.ambientMix > 0
        ? Math.sin(time * 0.0018 + node.phase) * 0.55 * frame.ambientMix
        : 0
    const radius = ((node.core ? 3.2 : 2.1) + ambientPulse * 0.35) * (0.58 + reveal * 0.42)
    const color = node.core ? palette.nodeCore : palette.node

    context.globalAlpha = reveal * route.intensity

    context.beginPath()
    context.arc(node.x, node.y, radius + 3.5 + activationWave * 5.5, 0, Math.PI * 2)
    context.strokeStyle = color
    context.lineWidth = 0.75
    context.stroke()

    context.beginPath()
    context.arc(node.x, node.y, radius, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
  }

  context.restore()
}

function drawCommissioningPulse(
  context: CanvasRenderingContext2D,
  route: BlueprintRoute,
  palette: BlueprintPalette,
  progress: number | null,
  routeIndex: number,
) {
  if (progress === null) return

  const stagger = routeIndex * 0.11
  const routeProgress = clamp01((progress - stagger) / Math.max(0.01, 1 - stagger))

  if (routeProgress <= 0 || routeProgress >= 1) return

  const tailLength = 0.075
  const tailSteps = 9

  context.save()
  context.globalCompositeOperation = 'lighter'
  context.shadowColor = palette.signalCyanGlow
  context.shadowBlur = 16

  for (let index = 0; index < tailSteps; index += 1) {
    const ratio = index / Math.max(1, tailSteps - 1)
    const tailProgress = Math.max(0, routeProgress - tailLength * (1 - ratio))
    const point = getRoutePoint(route, tailProgress, false)

    context.beginPath()
    context.arc(point.x, point.y, 1.2 + ratio * 1.8, 0, Math.PI * 2)
    context.globalAlpha = (0.08 + ratio * 0.82) * route.intensity
    context.fillStyle = palette.signalCyan
    context.fill()
  }

  context.restore()
}

function getSignalStyle(palette: BlueprintPalette, signalIndex: number): SignalStyle {
  return signalIndex % 2 === 0
    ? {
        color: palette.signalCyan,
        glow: palette.signalCyanGlow,
      }
    : {
        color: palette.signalPurple,
        glow: palette.signalPurpleGlow,
      }
}

function drawNodeArrivalFlashes(
  context: CanvasRenderingContext2D,
  route: BlueprintRoute,
  signalProgress: number,
  style: SignalStyle,
  opacity: number,
) {
  for (const node of route.nodes) {
    const distance = Math.abs(node.routeProgress - signalProgress)
    const flash = easeOutCubic(1 - distance / NODE_FLASH_WINDOW)

    if (flash <= 0) continue

    context.save()
    context.globalCompositeOperation = 'lighter'
    context.globalAlpha = flash * 0.34 * opacity * route.intensity
    context.strokeStyle = style.color
    context.shadowColor = style.glow
    context.shadowBlur = 18 * flash
    context.lineWidth = 0.8 + flash * 0.7

    context.beginPath()
    context.arc(node.x, node.y, 4 + flash * 6.5, 0, Math.PI * 2)
    context.stroke()

    context.globalAlpha = flash * 0.22 * opacity * route.intensity
    context.fillStyle = style.color
    context.beginPath()
    context.arc(node.x, node.y, 2.1 + flash * 1.5, 0, Math.PI * 2)
    context.fill()
    context.restore()
  }
}

function drawSignalTrail(
  context: CanvasRenderingContext2D,
  route: BlueprintRoute,
  signalProgress: number,
  style: SignalStyle,
  opacity: number,
) {
  context.save()
  context.globalCompositeOperation = 'lighter'
  context.shadowColor = style.glow
  context.shadowBlur = 12

  for (let index = 0; index < SIGNAL_TAIL_STEPS; index += 1) {
    const ratio = index / Math.max(1, SIGNAL_TAIL_STEPS - 1)
    const tailProgress = Math.max(0, signalProgress - SIGNAL_TAIL_LENGTH * (1 - ratio))
    const point = getRoutePoint(route, tailProgress, false)

    context.beginPath()
    context.arc(point.x, point.y, 0.8 + ratio * 1.7, 0, Math.PI * 2)
    context.globalAlpha = (0.06 + ratio * 0.86) * opacity * route.intensity
    context.fillStyle = style.color
    context.fill()
  }

  context.restore()
}

function drawSignals(
  context: CanvasRenderingContext2D,
  routes: BlueprintRoute[],
  palette: BlueprintPalette,
  ambientTime: number,
  animated: boolean,
  opacity: number,
) {
  if (opacity <= 0 || routes.length === 0) return

  if (!animated) {
    routes.forEach((route, routeIndex) => {
      const style = getSignalStyle(palette, routeIndex)
      const point = getRoutePoint(route, 0.28 + routeIndex * 0.2, false)

      context.save()
      context.globalAlpha = 0.52 * opacity * route.intensity
      context.fillStyle = style.color
      context.shadowColor = style.glow
      context.shadowBlur = 10
      context.beginPath()
      context.arc(point.x, point.y, 2, 0, Math.PI * 2)
      context.fill()
      context.restore()
    })

    return
  }

  const latestSignalIndex = Math.floor(ambientTime / AMBIENT_SIGNAL_INTERVAL)

  for (let historyIndex = 0; historyIndex < AMBIENT_SIGNAL_HISTORY; historyIndex += 1) {
    const signalIndex = latestSignalIndex - historyIndex

    if (signalIndex < 0) continue

    const signalStart = signalIndex * AMBIENT_SIGNAL_INTERVAL
    const signalProgress = (ambientTime - signalStart) / AMBIENT_SIGNAL_DURATION

    if (signalProgress < 0 || signalProgress > 1) continue

    const route = routes[signalIndex % routes.length]

    if (!route) continue

    const style = getSignalStyle(palette, signalIndex)
    const easedProgress = easeInOutCubic(signalProgress)

    drawNodeArrivalFlashes(context, route, easedProgress, style, opacity)
    drawSignalTrail(context, route, easedProgress, style, opacity)
  }
}

export function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const context = canvas?.getContext('2d', { alpha: true })

    if (!canvas || !host || !context) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const themeRoot = document.documentElement

    let width = 1
    let height = 1
    let routes = buildNetwork(width, height)
    let palette = getPalette()
    let frameId = 0
    let lastFrame = 0
    let introElapsed = motionQuery.matches ? INTRO_END : 0
    let ambientElapsed = 0
    let reducedMotion = motionQuery.matches
    let isIntersecting = true
    let isDocumentVisible = document.visibilityState === 'visible'

    const targetFps = () => (width <= MOBILE_BREAKPOINT ? MOBILE_FPS : DESKTOP_FPS)

    const draw = (time: number, animated: boolean) => {
      const introFrame = getIntroFrame(introElapsed, reducedMotion)

      context.clearRect(0, 0, width, height)
      drawGrid(context, width, height, palette, introFrame.gridOpacity)
      drawBootScan(context, width, height, palette, introFrame)

      routes.forEach((route) => {
        drawRoute(context, route, palette, time, animated, introFrame)
        drawNodes(context, route, palette, time, animated, introFrame)
      })

      routes.forEach((route, routeIndex) => {
        drawCommissioningPulse(
          context,
          route,
          palette,
          introFrame.commissioningPulse,
          routeIndex,
        )
      })

      drawSignals(
        context,
        routes,
        palette,
        ambientElapsed,
        animated,
        introFrame.ambientMix,
      )
    }

    const stopLoop = () => {
      if (!frameId) return

      window.cancelAnimationFrame(frameId)
      frameId = 0
      lastFrame = 0
    }

    const renderFrame = (time: number) => {
      frameId = 0

      if (reducedMotion || !isIntersecting || !isDocumentVisible) return

      if (lastFrame === 0 || time - lastFrame >= 1000 / targetFps()) {
        const elapsedSinceLastFrame = lastFrame === 0 ? 0 : Math.min(time - lastFrame, 80)

        lastFrame = time
        introElapsed = Math.min(INTRO_END, introElapsed + elapsedSinceLastFrame)

        if (introElapsed >= INTRO_AMBIENT_START) {
          ambientElapsed += elapsedSinceLastFrame
        }

        draw(time, true)
      }

      frameId = window.requestAnimationFrame(renderFrame)
    }

    const syncLoop = () => {
      if (reducedMotion) {
        stopLoop()
        introElapsed = INTRO_END
        draw(0, false)
        return
      }

      if (!isIntersecting || !isDocumentVisible) {
        stopLoop()
        return
      }

      if (!frameId) {
        frameId = window.requestAnimationFrame(renderFrame)
      }
    }

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      const nextWidth = Math.max(1, Math.round(bounds.width))
      const nextHeight = Math.max(1, Math.round(bounds.height))
      const maxDpr = nextWidth <= MOBILE_BREAKPOINT ? MOBILE_DPR : DESKTOP_DPR
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)

      width = nextWidth
      height = nextHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      routes = buildNetwork(width, height)
      draw(performance.now(), !reducedMotion)
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches

      if (reducedMotion) {
        introElapsed = INTRO_END
      }

      syncLoop()
    }

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible'
      syncLoop()
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        isIntersecting = entry.isIntersecting
        syncLoop()
      },
      { rootMargin: '120px 0px' },
    )
    const themeObserver = new MutationObserver(() => {
      palette = getPalette()
      draw(performance.now(), !reducedMotion)
    })

    resizeObserver.observe(host)
    intersectionObserver.observe(host)
    themeObserver.observe(themeRoot, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    motionQuery.addEventListener('change', handleMotionChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    resize()
    syncLoop()

    return () => {
      stopLoop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      motionQuery.removeEventListener('change', handleMotionChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      className="hero-background hero-background--blueprint"
      ref={canvasRef}
      aria-hidden="true"
    />
  )
}
