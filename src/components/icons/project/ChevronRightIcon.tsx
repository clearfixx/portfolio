import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ChevronRightIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m9 18 6-6-6-6" />
    </ProjectIcon>
  )
}
