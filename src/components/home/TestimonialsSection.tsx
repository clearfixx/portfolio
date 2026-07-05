import type { Testimonial } from '@/payload-types'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="home-section" id="testimonials">
      <div className="site-container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Feedback</p>
          <h2 className="section-heading__title">Testimonials</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.id}>
              <p className="testimonial-card__message">“{testimonial.message}”</p>
              <p className="testimonial-card__author">
                {testimonial.name}
                {testimonial.company && <span> · {testimonial.company}</span>}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
