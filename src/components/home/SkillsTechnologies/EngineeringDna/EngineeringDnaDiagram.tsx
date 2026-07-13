type DnaNode = {
  id: string
  label: string
  description: string
  x: number
  y: number
  anchorX: number
  anchorY: number
  align?: 'start' | 'middle' | 'end'
}

type DnaLink = {
  y: number
  leftX: number
  rightX: number
}

const dnaNodes: DnaNode[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    description: 'Scalable systems',
    x: 300,
    y: 50,
    anchorX: 300,
    anchorY: 122,
    align: 'middle',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Accessible interfaces',
    x: 104,
    y: 178,
    anchorX: 246,
    anchorY: 212,
    align: 'start',
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'APIs and data flows',
    x: 496,
    y: 178,
    anchorX: 354,
    anchorY: 212,
    align: 'end',
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Speed and efficiency',
    x: 108,
    y: 392,
    anchorX: 248,
    anchorY: 418,
    align: 'start',
  },
  {
    id: 'reliability',
    label: 'Reliability',
    description: 'Fault-tolerant code',
    x: 492,
    y: 392,
    anchorX: 352,
    anchorY: 418,
    align: 'end',
  },
  {
    id: 'growth',
    label: 'Growth',
    description: 'Continuous learning',
    x: 300,
    y: 488,
    anchorX: 300,
    anchorY: 458,
    align: 'middle',
  },
]

const dnaLinks: DnaLink[] = [
  { y: 132, leftX: 282, rightX: 318 },
  { y: 164, leftX: 260, rightX: 340 },
  { y: 206, leftX: 266, rightX: 334 },
  { y: 242, leftX: 226, rightX: 374 },
  { y: 354, leftX: 226, rightX: 374 },
  { y: 390, leftX: 262, rightX: 338 },
  { y: 426, leftX: 254, rightX: 346 },
  { y: 462, leftX: 282, rightX: 318 },
]

const cyanStrandPath = `
  M300 112
  C252 136 252 170 300 198
  C410 254 410 310 300 362
  C238 394 238 440 300 476
  C322 490 322 504 300 516
`

const purpleStrandPath = `
  M300 112
  C348 136 348 170 300 198
  C190 254 190 310 300 362
  C362 394 362 440 300 476
  C278 490 278 504 300 516
`

function renderNodeIcon(id: string) {
  switch (id) {
    case 'architecture':
      return <path d="M-11-4 0-10 11-4 0 2-11-4Zm0 8L0 10 11 4" />
    case 'frontend':
      return <path d="m-10-6-7 6 7 6M10-6l7 6-7 6M3-10-3 10" />
    case 'backend':
      return <path d="M-12-8h24v7h-24v-7Zm0 9h24v7h-24V1Zm6-5h.1M-6 5h.1" />
    case 'performance':
      return <path d="m2-12-13 15h9l-2 9L9-3H0l2-9Z" />
    case 'reliability':
      return <path d="M0-11 10-7v7c0 6-4 10-10 12C-6 10-10 6-10 0v-7l10-4Z" />
    case 'growth':
      return <path d="M-10 8C-4 6 5-2 8-10c2 7 0 14-6 18-4 2-8 2-12 0Z" />
    default:
      return <circle r="8" />
  }
}

function getNodeTextX(node: DnaNode) {
  const iconEdgeOffset = 29

  if (node.align === 'start') {
    return node.x - iconEdgeOffset
  }

  if (node.align === 'end') {
    return node.x + iconEdgeOffset
  }

  return node.x
}

function getConnectorPath(node: DnaNode) {
  const direction = node.x < node.anchorX ? 1 : node.x > node.anchorX ? -1 : 0
  const startX = node.x + direction * 29
  const startY = direction === 0 ? node.y + (node.y < node.anchorY ? 26 : -26) : node.y + 2

  if (direction === 0) {
    const controlOffset = node.y < node.anchorY ? 18 : -12

    return `M ${startX} ${startY} C ${startX - 10} ${startY + controlOffset}, ${node.anchorX + 10} ${
      node.anchorY - controlOffset
    }, ${node.anchorX} ${node.anchorY}`
  }

  const distanceX = node.anchorX - startX
  const distanceY = node.anchorY - startY

  return `M ${startX} ${startY} C ${startX + distanceX * 0.38} ${startY + distanceY * 0.08}, ${
    node.anchorX - distanceX * 0.28
  } ${node.anchorY - distanceY * 0.08}, ${node.anchorX} ${node.anchorY}`
}

export function EngineeringDnaDiagram() {
  return (
    <svg
      className="skills-tech__dna-diagram"
      viewBox="40 10 520 560"
      role="img"
      aria-label="Engineering DNA diagram"
    >
      <defs>
        <linearGradient id="dna-cyan-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7af5eb" stopOpacity="0.22" />
          <stop offset="48%" stopColor="#7af5eb" stopOpacity="1" />
          <stop offset="100%" stopColor="#7af5eb" stopOpacity="0.34" />
        </linearGradient>

        <radialGradient id="dna-center-glow">
          <stop offset="0%" stopColor="#7af5eb" stopOpacity="0.15" />
          <stop offset="58%" stopColor="#7af5eb" stopOpacity="0.045" />
          <stop offset="100%" stopColor="#7af5eb" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="dna-purple-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b066ff" stopOpacity="0.18" />
          <stop offset="48%" stopColor="#b066ff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#b066ff" stopOpacity="0.28" />
        </linearGradient>

        <filter id="dna-caption-cutout-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <mask id="dna-caption-clear-zone" maskUnits="userSpaceOnUse">
          <rect x="40" y="10" width="520" height="560" fill="white" />
          <rect
            x="178"
            y="250"
            width="244"
            height="76"
            rx="30"
            fill="black"
            filter="url(#dna-caption-cutout-blur)"
          />
        </mask>
      </defs>

      <circle cx="300" cy="298" r="150" fill="url(#dna-center-glow)" />

      <g className="skills-tech__dna-grid" aria-hidden="true">
        <path d="M300 52V526" />
      </g>

      <g className="skills-tech__dna-connectors" aria-hidden="true">
        {dnaNodes.map((node) => (
          <path key={`connector-${node.id}`} d={getConnectorPath(node)} />
        ))}
      </g>

      <g className="skills-tech__dna-helix" aria-hidden="true" mask="url(#dna-caption-clear-zone)">
        <path
          className="skills-tech__dna-strand-glow skills-tech__dna-strand-glow--cyan"
          d={cyanStrandPath}
          pathLength={1}
        />

        <path
          className="skills-tech__dna-strand-glow skills-tech__dna-strand-glow--purple"
          d={purpleStrandPath}
          pathLength={1}
        />

        <path
          className="skills-tech__dna-strand skills-tech__dna-strand--cyan"
          d={cyanStrandPath}
          pathLength={1}
        />

        <path
          className="skills-tech__dna-strand skills-tech__dna-strand--purple"
          d={purpleStrandPath}
          pathLength={1}
        />

        <path
          className="skills-tech__dna-energy skills-tech__dna-energy--cyan"
          d={cyanStrandPath}
          pathLength={1}
        />

        <path
          className="skills-tech__dna-energy skills-tech__dna-energy--purple"
          d={purpleStrandPath}
          pathLength={1}
        />

        {dnaLinks.map((link, index) => (
          <line
            key={`dna-link-${link.y}`}
            className={`skills-tech__dna-link skills-tech__dna-link--${index + 1}`}
            x1={link.leftX}
            x2={link.rightX}
            y1={link.y}
            y2={link.y}
          />
        ))}
      </g>

      <g className="skills-tech__dna-nodes">
        {dnaNodes.map((node) => {
          const nodeTextX = getNodeTextX(node)

          return (
            <g key={node.id} className={`skills-tech__dna-node skills-tech__dna-node--${node.id}`}>
              <circle className="skills-tech__dna-node-glow" cx={node.x} cy={node.y} r="31" />
              <circle className="skills-tech__dna-node-shell" cx={node.x} cy={node.y} r="24" />

              <g
                className="skills-tech__dna-node-icon"
                transform={`translate(${node.x} ${node.y})`}
                aria-hidden="true"
              >
                {renderNodeIcon(node.id)}
              </g>

              <text
                className="skills-tech__dna-node-label"
                x={nodeTextX}
                y={node.y + 43}
                textAnchor={node.align ?? 'middle'}
              >
                {node.label}
              </text>
              <text
                className="skills-tech__dna-node-description"
                x={nodeTextX}
                y={node.y + 60}
                textAnchor={node.align ?? 'middle'}
              >
                {node.description}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
