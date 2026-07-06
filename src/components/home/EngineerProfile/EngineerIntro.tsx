import { engineerProfile } from './data'

export function EngineerIntro() {
  return (
    <div className="engineer-profile__intro">
      <p className="section-heading__eyebrow">{engineerProfile.eyebrow}</p>

      <h2 className="engineer-profile__title">{engineerProfile.title}</h2>

      <p className="engineer-profile__description">{engineerProfile.description}</p>
    </div>
  )
}
