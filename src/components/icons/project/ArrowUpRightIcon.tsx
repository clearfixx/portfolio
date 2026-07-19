import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ArrowUpRightIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </ProjectIcon>
  )
}
