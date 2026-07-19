'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/project'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { ProjectMediaSlide } from './ProjectMediaCarousel'

type ProjectScreenshotCarouselProps = {
  slides: ProjectMediaSlide[]
}

function getVisibleSlides() {
  if (typeof window === 'undefined') {
    return 3
  }

  if (window.matchMedia('(max-width: 680px)').matches) {
    return 1
  }

  if (window.matchMedia('(max-width: 1040px)').matches) {
    return 2
  }

  return 3
}

function getSlideBasis(visibleSlides: number) {
  if (visibleSlides === 1) {
    return '100%'
  }

  if (visibleSlides === 2) {
    return 'calc(50% - 8px)'
  }

  return 'calc(33.333333% - 10.666667px)'
}

export function ProjectScreenshotCarousel({ slides }: ProjectScreenshotCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [visibleSlides, setVisibleSlides] = useState(3)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    function updateVisibleSlides() {
      setVisibleSlides(getVisibleSlides())
    }

    updateVisibleSlides()
    window.addEventListener('resize', updateVisibleSlides)

    return () => {
      window.removeEventListener('resize', updateVisibleSlides)
    }
  }, [])

  const maxIndex = Math.max(0, slides.length - visibleSlides)
  const pageIndexes = useMemo(
    () => Array.from({ length: maxIndex + 1 }, (_, index) => index),
    [maxIndex],
  )

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  if (slides.length === 0) {
    return null
  }

  function goTo(index: number) {
    const nextIndex = Math.min(maxIndex, Math.max(0, index))
    const viewport = viewportRef.current
    const slide = viewport?.querySelector<HTMLElement>(`[data-slide-index="${nextIndex}"]`)

    setActiveIndex(nextIndex)

    if (viewport && slide) {
      viewport.scrollTo({
        behavior: 'smooth',
        left: slide.offsetLeft,
      })
    }
  }

  return (
    <div className="project-screenshot-carousel">
      <button
        aria-label="Show previous screenshots"
        className="project-screenshot-carousel__arrow project-screenshot-carousel__arrow--previous"
        disabled={activeIndex === 0}
        type="button"
        onClick={() => goTo(activeIndex - 1)}
      >
        <ChevronLeftIcon aria-hidden="true" size={22} />
      </button>

      <div className="project-screenshot-carousel__viewport" ref={viewportRef}>
        <div className="project-screenshot-carousel__track">
          {slides.map((slide, index) => (
            <figure
              className="project-screenshot-carousel__slide"
              data-slide-index={index}
              key={`${slide.src}-${index}`}
              style={{ flexBasis: getSlideBasis(visibleSlides) }}
            >
              <div>
                <Image
                  alt={slide.alt}
                  fill
                  sizes={visibleSlides === 1 ? '100vw' : visibleSlides === 2 ? '50vw' : '33vw'}
                  src={slide.src}
                />
              </div>
              {slide.caption ? <figcaption>{slide.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>

      <button
        aria-label="Show next screenshots"
        className="project-screenshot-carousel__arrow project-screenshot-carousel__arrow--next"
        disabled={activeIndex === maxIndex}
        type="button"
        onClick={() => goTo(activeIndex + 1)}
      >
        <ChevronRightIcon aria-hidden="true" size={22} />
      </button>

      {pageIndexes.length > 1 ? (
        <div className="project-screenshot-carousel__pagination" aria-label="Screenshot pages">
          {pageIndexes.map((index) => (
            <button
              aria-label={`Show screenshot group ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? 'is-active' : undefined}
              key={index}
              type="button"
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
