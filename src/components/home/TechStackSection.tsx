import type { TechStack } from '@/payload-types'

type TechStackSectionProps = {
  technologies: TechStack[]
}

export function TechStackSection({ technologies }: TechStackSectionProps) {
  if (technologies.length === 0) {
    return null
  }

  return (
    <section className="home-section" id="stack">
      <div className="site-container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Tools</p>
          <h2 className="section-heading__title">Tech Stack</h2>
        </div>

        <div className="tech-list">
          {technologies.map((technology) => (
            <article className="tech-card" key={technology.id}>
              <h3>{technology.name}</h3>
              {technology.description && <p>{technology.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
