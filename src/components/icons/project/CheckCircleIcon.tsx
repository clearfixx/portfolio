import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function CheckCircleIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.6 2.6L16.5 9" />
    </ProjectIcon>
  )
}
