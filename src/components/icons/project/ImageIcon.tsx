import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ImageIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m4.5 17 4.7-4.7 3.2 3.2 2.1-2.1 5 5" />
    </ProjectIcon>
  )
}
