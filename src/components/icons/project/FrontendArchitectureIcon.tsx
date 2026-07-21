import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function FrontendArchitectureIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 8l2 2-2 2M13 7l-2 6" />
    </ProjectIcon>
  )
}
