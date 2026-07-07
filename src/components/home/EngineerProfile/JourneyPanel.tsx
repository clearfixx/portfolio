const journey = [
  {
    year: '2013',
    title: 'First steps in Web Development',
    description:
      'HTML, CSS, JavaScript. Built static websites and learned how the web works.',
  },
  {
    year: '2016',
    title: 'Backend Development',
    description:
      'PHP & MySQL. Building dynamic applications and understanding databases.',
  },
  {
    year: '2018',
    title: 'Frontend Specialization',
    description:
      'React & JavaScript. Component architecture and modern frontend development.',
  },
  {
    year: '2022',
    title: 'Fullstack & Architecture',
    description:
      'Next.js, TypeScript, Node.js. Focus on clean architecture and performance.',
  },
  {
    year: '2024',
    title: 'Systems Thinking',
    description:
      'Developer experience, automation, CI/CD and long-term maintainability.',
  },
  {
    year: '2026',
    title: 'Building Portfolio',
    accent: true,
    description:
      'Creating a modern portfolio with a unique engineering identity.',
  },
]

export function JourneyPanel() {
  return (
    <article className="engineer-profile__panel engineer-profile__journey-panel">
      <header className="engineer-profile__panel-header">
        <h3>Engineering Journey</h3>
        <span>{'//'} my path</span>
      </header>

      <div className="journey">
        {journey.map((item, index) => (
          <div
            key={item.year}
            className={`journey__item ${item.accent ? 'journey__item--accent' : ''}`}
          >
            <div className="journey__year">
              {item.year}
            </div>

            <div className="journey__line">
              <span className="journey__dot" />

              {index !== journey.length - 1 && (
                <span className="journey__connector" />
              )}
            </div>

            <div className="journey__content">
              <h4>{item.title}</h4>

              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="journey__footer">
        MISSION: CONTINUOUS IMPROVEMENT
      </footer>
    </article>
  )
}
