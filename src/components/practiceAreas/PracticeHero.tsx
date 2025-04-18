'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { X } from 'lucide-react'

interface PracticeArea {
  id: number
  title: string
  slug: string
  department: {
    title: string
  }
}

interface ServicesBlockProps {
  block: {
    practiceAreas: PracticeArea[]
  }
}

export default function PracticeHeroSection({ block }: ServicesBlockProps) {
  const practiceAreas = block?.practiceAreas || []

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // For responsive design
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // For animations
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: 'linear-gradient(135deg, #003566 0%, #001d3d 100%)',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3)',
      }}
      ref={ref}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-300/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto space-y-16"
        >
          {/* Practice Areas Section */}
          {practiceAreas.length > 0 ? (
            <motion.div variants={itemVariants} className="pt-8">
              <div className="text-center text-white mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Practice Areas</h2>
                <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 mb-4"></div>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Explore our specialized legal services across various domains
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceAreas.map((area) => (
                  <motion.div key={area.id} whileHover={{ y: -5 }} className="h-full">
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className="block h-full rounded-xl overflow-hidden border-2 border-blue-400/30 shadow-lg transition-all duration-300 hover:shadow-blue-400/20 hover:border-blue-400/50"
                    >
                      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/10 to-white/5">
                        <h3 className="font-bold text-xl text-white text-center mb-4">
                          {area.title}
                        </h3>
                        <div className="w-12 h-1 bg-blue-300/50 mb-4"></div>
                        <span className="px-3 py-1.5 bg-blue-900/50 text-blue-200 rounded-full text-xs font-medium text-center border border-white">
                          {area.department.title}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-white bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <p>No practice areas found.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Department Modal */}
      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        ></motion.div>
      )}
    </section>
  )
}
