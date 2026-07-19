'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/project'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type ProjectMediaSlide = {
  src: string
  alt: string
  caption?: string
}

type ProjectMediaCarouselProps = {
  slides: ProjectMediaSlide[]
  priority?: boolean
  variant?: 'hero' | 'gallery'
}

export function ProjectMediaCarousel({
  slides,
  priority = false,
  variant = 'hero',
}: ProjectMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0)
    }
  }, [activeIndex, slides.length])

  if (slides.length === 0) {
    return null
  }

  const activeSlide = slides[activeIndex]
  const hasNavigation = slides.length > 1

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  return (
    <div className={`project-media-carousel project-media-carousel--${variant}`}>
      <div className="project-media-carousel__stage">
        <Image
          alt={activeSlide.alt}
          fill
          priority={priority}
          sizes={variant === 'hero' ? '(max-width: 900px) 100vw, 56vw' : '(max-width: 900px) 100vw, 44vw'}
          src={activeSlide.src}
        />

        {hasNavigation ? (
          <>
            <button
              aria-label="Show previous project image"
              className="project-media-carousel__arrow project-media-carousel__arrow--previous"
              type="button"
              onClick={showPrevious}
            >
              <ChevronLeftIcon aria-hidden="true" size={18} />
            </button>
            <button
              aria-label="Show next project image"
              className="project-media-carousel__arrow project-media-carousel__arrow--next"
              type="button"
              onClick={showNext}
            >
              <ChevronRightIcon aria-hidden="true" size={18} />
            </button>
          </>
        ) : null}

        <span className="project-media-carousel__counter">
          {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {hasNavigation ? (
        <div className="project-media-carousel__thumbs" aria-label="Project image thumbnails">
          {slides.map((slide, index) => (
            <button
              aria-label={`Show project image ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? 'is-active' : undefined}
              key={`${slide.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
            >
              <Image alt="" fill sizes="130px" src={slide.src} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
