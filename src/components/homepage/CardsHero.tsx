'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface WhyBlockProps {
  block: {
    cards: Array<{
      id: number
      title: string
      content: string
    }>
  }
}

export default function CardsHero({ block }: WhyBlockProps) {
  const defaultCards = [
    {
      id: 1,
      title: 'Strategic Counsel',
      content:
        'We provide nuanced legal strategies tailored to your specific needs and objectives.',
    },
    {
      id: 2,
      title: 'Expert Representation',
      content:
        'Our attorneys bring deep experience to every case, ensuring skilled advocacy at every turn.',
    },
    {
      id: 3,
      title: 'Client-Centered Focus',
      content: 'We prioritize your goals, communicating clearly throughout your legal journey.',
    },
    {
      id: 4,
      title: 'Proven Results',
      content: 'Our track record demonstrates our commitment to achieving favorable outcomes.',
    },
  ]

  const cards = block?.cards || defaultCards

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative -mt-20 pb-16 z-10">
      {/* Offset cards container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="flex flex-col h-full bg-white shadow-lg overflow-hidden rounded-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderTop: `3px solid ${index % 2 === 0 ? '#cb8547' : '#f0f1f0'}`,
              }}
            >
              <div className="p-6 md:p-7 flex flex-col h-full">
                {/* Card number indicator */}
                <div className="mb-4 flex items-center">
                  <span className="text-3xl font-light text-[#cb8547]/60 mr-3">0{index + 1}</span>
                  <div className="flex-grow h-px bg-[#f0f1f0]"></div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-medium text-gray-900 mb-3">{card.title}</h3>

                {/* Content */}
                <p className="text-gray-700 flex-grow">{card.content}</p>

                {/* Bottom decorative element */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="w-8 h-px bg-[#cb8547]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#cb8547]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative diagonal line separator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#cb8547]/20 to-[#f0f1f0]/50"></div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <svg width="100%" height="100%" className="opacity-5">
          <pattern
            id="diagonalLines"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#cb8547" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>
    </section>
  )
}
