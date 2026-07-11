import Image from 'next/image'

const profileStats = [
  {
    label: 'Years Exp.',
    value: '12+',
  },
  {
    label: 'Projects',
    value: '18+',
  },
  {
    label: 'Commits',
    value: '6 241+',
  },
  {
    label: 'Coffee',
    value: '∞',
  },
]

export function ProfilePanel() {
  return (
    <article className="engineer-profile__panel engineer-profile__profile-panel">
      <div className="engineer-profile__photo-card">
        <div className="engineer-profile__photo-meta">
          <span>{'{'}PROFILE_ID{'}'}</span>
          <strong>AK_10061988</strong>
        </div>

        <div className="engineer-profile__photo-stage">
          <div className="engineer-profile__photo-image">
            <Image
              alt="Portrait of Andrii Kulahin"
              fill
              loading="lazy"
              sizes="(max-width: 1180px) 100vw, 32vw"
              src="/images/profile/engineer-profile.png"
            />
          </div>

          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--top-left" />
          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--top-right" />
          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--bottom-left" />
          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--bottom-right" />

          <span className="engineer-profile__reticle" aria-hidden="true" />

          <span className="engineer-profile__online-badge">
            <span />
            ONLINE
          </span>
        </div>
      </div>

      <div className="engineer-profile__profile-content">
        <h3>Andrii Kulahin</h3>
        <p className="engineer-profile__role">Software Engineer</p>

        <p className="engineer-profile__location">Ukraine, Kyiv 🇺🇦</p>

        <p className="engineer-profile__bio">
          I build scalable web applications and distributed systems. Architecture first. Quality
          always.
        </p>

        <div className="engineer-profile__stats">
          {profileStats.map((stat) => (
            <div className="engineer-profile__stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
