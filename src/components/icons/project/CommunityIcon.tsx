import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function CommunityIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M14 15.5a4.5 4.5 0 0 1 6.5 4" />
    </ProjectIcon>
  )
}
