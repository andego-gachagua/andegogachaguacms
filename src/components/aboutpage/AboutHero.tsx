'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

interface AboutHeroBlockProps {
  block: {
    clause: string
    photo: { url: string }
  }
}

export default function AboutHero({ block }: AboutHeroBlockProps) {
  const aboutContent = block.clause

  // Animation controls
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  // Format paragraphs
  const paragraphs = aboutContent.split('. ').reduce((acc, sentence, index, array) => {
    if (index % 3 === 0) {
      const sentences = []
      if (sentence) sentences.push(sentence + '.')
      if (array[index + 1]) sentences.push(array[index + 1] + '.')
      if (array[index + 2]) sentences.push(array[index + 2] + '.')
      acc.push(sentences.join(' '))
    }
    return acc
  }, [] as string[])

  return (
    <section ref={ref} className="bg-white overflow-hidden">
      <div className="justify-center text-center p-12 bg-gradient-to-br from-gray-900 to-black mt-6 md:mt-10">
        <div>
          <h2 className="text-white about_title">About Us</h2>
        </div>
        <div className="flex justify-center text-center">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium hover:no-underline text-gray-400 dark:hover:color-andego"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>

              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-white md:ml-2">About</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Image Column with subtle animation */}
          <motion.div className="w-full lg:w-1/2 relative" variants={itemVariants}>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={block.photo?.url || '/bg.jpg'}
                  width={600}
                  height={400}
                  priority
                  alt="LilanKichwenKadima Law Firm"
                  className="object-cover transition-transform duration-700 hover:scale-105 "
                />
              </div>

              {/* Accent details */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white/30 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white/30 rounded-br-lg" />

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent mix-blend-overlay" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full border border-[#cb8547]/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border border-[#cb8547]/10 -z-10" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center"
            variants={itemVariants}
          >
            {/* Heading with animated underline */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 relative inline-block">
                About Our Firm
                <motion.div
                  className="absolute -bottom-3 left-0 h-1 bg-[#cb8547]"
                  initial={{ width: '0%' }}
                  animate={inView ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </h2>
            </div>

            {/* Content with staggered animation */}
            <motion.div
              className="space-y-5"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.1 * index },
                    },
                  }}
                  className="text-gray-700 leading-relaxed text-base md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Subtle signature element */}
            <motion.div className="mt-10 flex items-center" variants={itemVariants}>
              <div className="h-px bg-gradient-to-r from-[#cb8547] to-transparent flex-grow max-w-[120px]" />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-3 text-[#cb8547]"
              >
                <path
                  d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm-1-9.95V16l5-5-5-5v3.05C7.5 9.5 6 11.1 6 13c0 1.75 1.5 3.1 5 4v-4.95z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
              </svg>
              <div className="h-px bg-gradient-to-l from-[#cb8547] to-transparent flex-grow max-w-[120px]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
