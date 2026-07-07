const philosophy = [
  {
    icon: '01',
    title: 'Architecture First',
    description: 'Every interface should have a clear structure before visual polish begins.',
  },
  {
    icon: '02',
    title: 'Meaningful UI',
    description: 'Design is not decoration. It should guide, explain and reduce friction.',
  },
  {
    icon: '03',
    title: 'Quality Always',
    description: 'Clean code, predictable behavior and maintainability matter after launch.',
  },
  {
    icon: '04',
    title: 'Ship Iteratively',
    description: 'Small stable steps beat chaotic rewrites and keep the product moving.',
  },
]

export function PhilosophyPanel() {
  return (
    <article className="engineer-profile__panel engineer-profile__philosophy-panel">
      <header className="engineer-profile__panel-header">
        <h3>Engineering Philosophy</h3>
        <span>{'//'} principles</span>
      </header>

      <div className="philosophy-grid">
        {philosophy.map((item) => (
          <div className="philosophy-card" key={item.title}>
            <span className="philosophy-card__icon">{item.icon}</span>

            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="engineer-profile__terminal" aria-label="Engineer terminal preview">
        <div className="engineer-profile__terminal-top">
          <span />
          <span />
          <span />
        </div>

        <div className="engineer-profile__terminal-body">
          <p>
            <span>$</span> npm run build
          </p>
          <p>
            <span>✓</span> Compiled successfully
          </p>
          <p>
            <span>→</span> Ready for production
          </p>
        </div>
      </div>
    </article>
  )
}
