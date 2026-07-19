import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function GitBranchIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="6" cy="19" r="2" />
      <path d="M6 7v10" />
      <path d="M8 10h5a5 5 0 0 0 5-5" />
    </ProjectIcon>
  )
}
