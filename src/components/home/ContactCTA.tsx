import type { Contact, Homepage } from '@/payload-types'

type ContactCTAProps = {
  contact: Contact
  contactSection: Homepage['contactSection']
}

export function ContactCTA({ contact, contactSection }: ContactCTAProps) {
  if (contactSection?.enabled === false) {
    return null
  }

  return (
    <section className="home-section home-contact" id="contact">
      <div className="site-container home-contact__inner">
        <div>
          <p className="section-heading__eyebrow">Contact</p>
          <h2 className="section-heading__title">{contactSection?.title ?? 'Let’s build something'}</h2>
          {contactSection?.description && <p className="home-contact__text">{contactSection.description}</p>}
        </div>

        <a className="button button--primary" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </div>
    </section>
  )
}
