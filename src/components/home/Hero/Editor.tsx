const codeLines = [
  'const mission = createPortfolio({',
  "  engineer: 'Andrii Kulahin',",
  "  stack: ['Next.js', 'Payload CMS', 'TypeScript'],",
  "  focus: 'systems that solve real problems',",
  '  qualityGate: {',
  '    architecture: true,',
  '    performance: true,',
  '    maintainability: true,',
  '  },',
  '})',
]

export function Editor() {
  return (
    <div className="hero-editor">
      <div className="panel-header">
        <span>Live Editor</span>
        <strong>mission.ts</strong>
      </div>

      <pre className="hero-editor__code">
        {codeLines.map((line, index) => (
          <code key={`${line}-${index}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {line}
          </code>
        ))}
      </pre>
    </div>
  )
}
