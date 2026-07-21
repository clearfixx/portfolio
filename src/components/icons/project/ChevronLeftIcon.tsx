import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ChevronLeftIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </ProjectIcon>
  )
}
