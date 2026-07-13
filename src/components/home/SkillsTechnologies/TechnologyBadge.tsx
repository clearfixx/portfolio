import type { SkillTechnology } from '@/lib/cms/homepage'
import { TechBrandIcon } from './TechBrandIcon'

type TechnologyBadgeProps = {
  technology: SkillTechnology
}

export function TechnologyBadge({ technology }: TechnologyBadgeProps) {
  return (
    <span className={`skills-tech__badge skills-tech__badge--${technology.id}`}>
      <span className="skills-tech__badge-icon" aria-hidden="true">
        <TechBrandIcon id={technology.id} />
      </span>
      <span className="skills-tech__badge-label">{technology.name}</span>
    </span>
  )
}
