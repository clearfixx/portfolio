import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ResearchIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M9 3h6" />
      <path d="M10 3v5l-5 9a2 2 0 0 0 1.75 3h10.5A2 2 0 0 0 19 17l-5-9V3" />
      <path d="M8 14h8" />
      <circle cx="10" cy="17" r=".75" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16" r=".75" fill="currentColor" stroke="none" />
    </ProjectIcon>
  )
}
