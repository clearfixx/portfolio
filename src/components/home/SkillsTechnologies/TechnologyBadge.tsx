import type { SkillTechnology } from './data'

type TechnologyBadgeProps = {
  technology: SkillTechnology
}

export function TechnologyBadge({ technology }: TechnologyBadgeProps) {
  return (
    <span className="skills-tech__badge">
      <span className="skills-tech__badge-mark" aria-hidden="true">
        {technology.shortName ?? technology.name.slice(0, 2)}
      </span>
      <span>{technology.name}</span>
    </span>
  )
}
