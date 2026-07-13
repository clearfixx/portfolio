import Image from 'next/image'

import type { EngineerProfileViewModel } from '@/lib/cms/homepage'

type ProfilePanelProps = {
  profile: EngineerProfileViewModel['profile']
}

export function ProfilePanel({ profile }: ProfilePanelProps) {
  return (
    <article className="engineer-profile__panel engineer-profile__profile-panel">
      <div className="engineer-profile__photo-card">
        <div className="engineer-profile__photo-meta">
          <span>
            {'{'}PROFILE_ID{'}'}
          </span>
          <strong>{profile.id}</strong>
        </div>

        <div className="engineer-profile__photo-stage">
          <div className="engineer-profile__photo-image">
            <Image
              alt={profile.image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1180px) 100vw, 32vw"
              src={profile.image.src}
            />
          </div>

          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--top-left" />
          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--top-right" />
          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--bottom-left" />
          <span className="engineer-profile__hud-corner engineer-profile__hud-corner--bottom-right" />
          <span className="engineer-profile__reticle" aria-hidden="true" />

          <span
            className={`engineer-profile__online-badge engineer-profile__online-badge--${profile.status.tone}`}
          >
            <span />
            {profile.status.label}
          </span>
        </div>
      </div>

      <div className="engineer-profile__profile-content">
        <h3>{profile.name}</h3>
        <p className="engineer-profile__role">{profile.role}</p>

        {profile.location ? <p className="engineer-profile__location">{profile.location}</p> : null}

        <p className="engineer-profile__bio">{profile.bio}</p>

        {profile.stats.length > 0 ? (
          <div className="engineer-profile__stats">
            {profile.stats.map((stat) => (
              <div className="engineer-profile__stat" key={stat.id}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
