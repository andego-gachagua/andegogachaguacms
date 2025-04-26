'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RichText } from '../RichText'
import { Book } from 'lucide-react'
import Link from 'next/link'

interface PracticeArea {
  id: number
  title: string
  slug: string
  description: any
}

interface ServicesBlockProps {
  block: {
    practiceAreas: PracticeArea[]
  }
}

export default function PracticeHeroSection({ block }: ServicesBlockProps) {
  const practiceAreas = block?.practiceAreas || []
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const openModal = (area: PracticeArea) => {
    setSelectedArea(area)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
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
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32 bg-white" ref={ref}>
      {/* Keep the header as it is */}
      <div className="justify-center text-center p-12 bg-gradient-to-br from-gray-900 to-black mt-6 md:mt-10">
        <div>
          <h2 className="text-white about_title">Practice Areas</h2>
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
                  <span className="ml-1 text-sm font-medium text-white md:ml-2">
                    Practice Areas
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Adjusted content area with smaller cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Practice Areas Section */}
          {practiceAreas.length > 0 ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            >
              {practiceAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  className="group"
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                >
                  <div
                    className="h-full relative rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
                    onClick={() => openModal(area)}
                  >
                    {/* Background gradient with subtle pattern */}
                    <div className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23cb8547\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

                    <div className="relative flex flex-col h-full p-5 border border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out bg-[#cb8547]"></div>

                      {/* Number indicator - smaller */}
                      <div className="mb-3">
                        <span className="inline-block text-2xl font-bold text-[#cb8547] opacity-20 group-hover:opacity-30 transition-opacity">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>

                      {/* Icon - smaller */}
                      <div className="p-2 rounded-full mb-4 w-10 h-10 flex items-center justify-center bg-[#cb8547] bg-opacity-10 border border-[#cb8547] border-opacity-30">
                        <Book size={16} className="text-[#cb8547] opacity-80" />
                      </div>

                      {/* Content - smaller */}
                      <h3 className="text-lg font-bold mb-3 text-[#cb8547] group-hover:text-black transition-colors">
                        {area.title}
                      </h3>

                      <div className="text-gray-700 mb-4 text-sm flex-grow opacity-90 text-justify">
                        <RichText data={area.description} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 mb-4 bg-[#cb8547] bg-opacity-10">
                <Book size={24} className="text-[#cb8547] opacity-60" />
              </div>
              <h3 className="text-black text-lg mb-2">No Practice Areas Found</h3>
              <p className="text-gray-600 text-sm">
                Please check back later for our areas of expertise
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detail Modal - kept mostly the same */}
      {isModalOpen && selectedArea && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header with accent */}
              <div className="relative">
                <div className="h-2 w-full bg-[#cb8547]"></div>
                <div className="p-6 md:p-8 border-b border-gray-200">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-black transition-colors"
                  >
                    ✕
                  </button>
                  <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-3 bg-[#cb8547] bg-opacity-20 text-[#cb8547]">
                    Practice Area
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black">
                    {selectedArea.title}
                  </h3>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <div className="prose max-w-none">
                  <RichText data={selectedArea.description} />
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 rounded-lg font-medium transition-all bg-[#cb8547] bg-opacity-15 text-white border border-[#cb8547] hover:bg-[#cb8547] hover:text-black"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </section>
  )
}
