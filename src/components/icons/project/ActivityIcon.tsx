import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ActivityIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M3 12h4l2.25-5 4.5 10L16 12h5" />
    </ProjectIcon>
  )
}
