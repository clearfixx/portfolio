import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ClockIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </ProjectIcon>
  )
}
