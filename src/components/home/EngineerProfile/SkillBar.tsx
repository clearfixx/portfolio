type SkillBarProps = {
  label: string
  value: number
}

export function SkillBar({ label, value }: SkillBarProps) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  )
}
