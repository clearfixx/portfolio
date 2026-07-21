import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function BarChartIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M4 20V11" />
      <path d="M10 20V5" />
      <path d="M16 20v-6" />
      <path d="M22 20H2" />
    </ProjectIcon>
  )
}
