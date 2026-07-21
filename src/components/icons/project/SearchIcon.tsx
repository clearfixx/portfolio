import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function SearchIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </ProjectIcon>
  )
}
