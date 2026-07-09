export type EngineeringDnaNode = {
  id: string
  label: string
  x: number
  y: number
  controlX: number
  controlY: number
}

export const engineeringDnaNodes: EngineeringDnaNode[] = [
  { id: 'architecture', label: 'Architecture', x: 300, y: 58, controlX: 300, controlY: 170 },
  { id: 'reliability', label: 'Reliability', x: 520, y: 188, controlX: 425, controlY: 220 },
  { id: 'backend', label: 'Backend', x: 505, y: 410, controlX: 430, controlY: 370 },
  { id: 'growth', label: 'Growth', x: 300, y: 545, controlX: 300, controlY: 430 },
  { id: 'frontend', label: 'Frontend', x: 95, y: 410, controlX: 170, controlY: 370 },
  { id: 'performance', label: 'Performance', x: 80, y: 188, controlX: 175, controlY: 220 },
]
