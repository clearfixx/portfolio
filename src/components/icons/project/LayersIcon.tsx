import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function LayersIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </ProjectIcon>
  )
}
