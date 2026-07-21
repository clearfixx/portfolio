import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function BrainIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0-1 5.6A3.5 3.5 0 0 0 8.5 18H10V6a2 2 0 0 0-.5-1.5Z" />
      <path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1 1 5.6A3.5 3.5 0 0 1 15.5 18H14V6a2 2 0 0 1 .5-1.5Z" />
      <path d="M7 9h3M14 9h3M7.5 14H10M14 14h2.5" />
    </ProjectIcon>
  )
}
