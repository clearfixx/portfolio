import { EngineeringDnaDiagram } from './EngineeringDnaDiagram'

export function EngineeringDna() {
  return (
    <div className="skills-tech__dna" aria-label="Engineering DNA">
      <EngineeringDnaDiagram />

      <div className="skills-tech__dna-caption">
        <strong>Engineering DNA</strong>
        <span>systems · architecture · delivery</span>
      </div>
    </div>
  )
}
