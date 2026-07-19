import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function MediaIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m4 17 5-5 3.5 3.5L15 13l5 5" />
    </ProjectIcon>
  )
}
