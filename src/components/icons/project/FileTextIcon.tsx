import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function FileTextIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M6 3h8l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v5h5" />
      <path d="M8 12h8M8 16h8" />
    </ProjectIcon>
  )
}
