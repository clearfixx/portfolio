import type { SkillCard as SkillCardType } from './data'
import { TechnologyBadge } from './TechnologyBadge'

type SkillCardProps = {
  card: SkillCardType
}

export function SkillCard({ card }: SkillCardProps) {
  return (
    <article
      className={`skills-tech__card skills-tech__card--${card.area} skills-tech__card--${card.tone}`}
    >
      <div className="skills-tech__card-header">
        <span className="skills-tech__card-number">{card.number}</span>

        <div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </div>

      <div className="skills-tech__badges" aria-label={`${card.title} technologies`}>
        {card.technologies.map((technology) => (
          <TechnologyBadge key={`${card.id}-${technology.name}`} technology={technology} />
        ))}
      </div>

      {card.details ? (
        <dl className="skills-tech__details">
          {card.details.map((detail) => (
            <div key={`${card.id}-${detail.label}`}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
}
