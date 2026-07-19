import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function SlidersIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M4 6h5M13 6h7" />
      <circle cx="11" cy="6" r="2" />
      <path d="M4 12h10M18 12h2" />
      <circle cx="16" cy="12" r="2" />
      <path d="M4 18h2M10 18h10" />
      <circle cx="8" cy="18" r="2" />
    </ProjectIcon>
  )
}
