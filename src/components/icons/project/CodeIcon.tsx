import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function CodeIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m8.5 7-5 5 5 5" />
      <path d="m15.5 7 5 5-5 5" />
      <path d="m14 4-4 16" />
    </ProjectIcon>
  )
}
