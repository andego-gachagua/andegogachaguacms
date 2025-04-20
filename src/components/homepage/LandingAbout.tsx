'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

interface AboutUsBlockProps {
  block: {
    heading: string
    description: string
    teamDescription?: string
  }
}

export default function AboutUsSection({ block }: AboutUsBlockProps) {
  const heading = block?.heading || 'About Our Law Firm'
  const description =
    block?.description ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <section ref={ref} className="py-16 md:py-24 overflow-hidden relative bg-white">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cb8547] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#cb8547] via-transparent to-[#cb8547] opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          {/* Elegant section header */}
          <motion.div variants={fadeIn} className="text-center mb-6">
            <span className="inline-block px-4 py-1 text-[#cb8547] text-sm font-medium tracking-wider uppercase border-b border-[#cb8547]">
              About Us
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={fadeIn} className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 relative inline-block">
              {heading}
              <div className="absolute -bottom-2 left-0 w-full h-px bg-[#cb8547] opacity-50" />
            </h2>
          </motion.div>

          {/* Description with refined typography */}
          <motion.div variants={fadeIn} className="mb-12">
            <p className="text-gray-700 leading-relaxed text-base md:text-lg font-light text-justify">
              {description}
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div variants={fadeIn} className="flex justify-center my-10">
            <div className="flex items-center w-full max-w-xs">
              <div className="flex-grow h-px bg-[#f0f1f0]"></div>
              <div className="mx-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#cb8547"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <div className="flex-grow h-px bg-[#f0f1f0]"></div>
            </div>
          </motion.div>

          {/* CTA with professional styling */}
          <motion.div variants={fadeIn} className="text-center mt-10">
            <Link
              href="/who-we-are"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#cb8547] text-[#cb8547] bg-white hover:bg-[#cb8547] hover:text-white font-medium transition-colors duration-300 ease-in-out"
            >
              Learn About Our Practice
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Subtle bottom decoration */}
          <motion.div variants={fadeIn} className="mt-16 flex justify-center">
            <div className="w-16 h-1 bg-[#cb8547] opacity-40"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
