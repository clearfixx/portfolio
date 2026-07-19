import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function CalendarIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
      <path d="M7.5 14h.01M12 14h.01M16.5 14h.01M7.5 18h.01M12 18h.01" />
    </ProjectIcon>
  )
}
