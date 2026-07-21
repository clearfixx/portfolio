import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ChevronDownIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m7 9.5 5 5 5-5" />
    </ProjectIcon>
  )
}
