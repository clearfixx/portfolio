import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ServicesArchitectureIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <rect x="4" y="4" width="16" height="4" rx="1" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <rect x="4" y="16" width="16" height="4" rx="1" />
      <path d="M8 6h.01M8 12h.01M8 18h.01" />
    </ProjectIcon>
  )
}
