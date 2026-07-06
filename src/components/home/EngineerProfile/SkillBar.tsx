type SkillBarProps = {
  label: string
  value: number
}

export function SkillBar({ label, value }: SkillBarProps) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="skill-bar__track">
        <span
          className="skill-bar__fill"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  )
}
