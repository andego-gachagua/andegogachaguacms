'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ServicesBlockProps {
  block: {
    heading?: string
    practiceAreas: {
      id: number
      title: string
      slug: string
      description: string
    }[]
  }
}

export default function ServicesCarouselSection({ block }: ServicesBlockProps) {
  const heading = block?.heading || 'Our Services'
  const practiceAreas = block?.practiceAreas

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const itemsPerPage = 3
  const totalPages = Math.ceil(practiceAreas.length / itemsPerPage)

  // Observer for scroll-triggered appearance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = document.querySelector('.services-section')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage
    return practiceAreas.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section className="services-section py-20 bg-black relative overflow-hidden transition-opacity duration-700 opacity-0">
      {/* Decorative background elements */}

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="scales" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 35 Q30 20 20 5 Q10 20 20 35z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#scales)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute right-1/2 top-0 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#cb8647" />
              <stop offset={1} stopColor="#cb8547" />
            </radialGradient>
          </defs>
        </svg>
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="text-center mb-6 fade-in-up">
            <span className="inline-block px-4 py-1 text-white text-sm font-medium tracking-wider uppercase border-b border-white/60">
              Legal Expertise
            </span>
          </div>

          <div className="text-center mb-12 relative fade-in-up delay-1">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white relative inline-block">
              {heading}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-px bg-white/70" />
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative fade-in-up delay-2">
            <div
              className={`carousel-container overflow-hidden ${isTransitioning ? 'transitioning' : ''}`}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 transition-all duration-500 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0.5 : 1,
                  transform: `translateY(${isTransitioning ? '10px' : '0'})`,
                }}
              >
                {getCurrentItems().map((service) => (
                  <div
                    key={service.id}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 border border-white/20 hover:shadow-lg hover:shadow-black/10 hover:translate-y-[-4px]"
                  >
                    {/* Gold accent line with shimmer */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/50 shimmer-effect"></div>

                    <div className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center">
                      {/* Service number */}
                      <span className="text-white/30 text-sm font-medium mb-3">
                        {String(service.id).padStart(2, '0')}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl font-serif font-semibold text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                        {service.title}
                      </h3>

                      {/* Learn more link */}
                      <Link
                        href={`/practice-areas/${service.slug}`}
                        className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white group-hover:underline mt-auto"
                      >
                        Learn more
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Pagination dots */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isTransitioning) return
                      setIsTransitioning(true)
                      setCurrentIndex(index)
                      setTimeout(() => setIsTransitioning(false), 500)
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                      currentIndex === index ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 fade-in-up delay-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-medium hover:bg-white hover:text-[#cb8547] transition-all duration-300 rounded-md group relative overflow-hidden"
            >
              <span className="relative z-10">View all practice areas</span>
              <span className="absolute inset-0 bg-white/10 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </Link>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        .section-visible {
          opacity: 1;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        .delay-1 {
          transition-delay: 0.2s;
        }

        .delay-2 {
          transition-delay: 0.4s;
        }

        .delay-3 {
          transition-delay: 0.6s;
        }

        .section-visible .fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
    </section>
  )
}
