'use client'
import React, { useEffect, useState } from 'react'
import { PhoneCall, ChevronRight } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface HeroBlockProps {
  block: {
    heading: string
    subheading: string
    hero_image: { url: string }
  }
}

export default function HeroBlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.heading || 'Expert Legal Representation For Complex Matters'
  const subheading =
    block?.subheading ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'
  const heroImage = block?.hero_image?.url || '/bg.jpg'

  // State to hold the background image load status
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Setup intersection observer for scroll animations
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // Preload the hero image when the component mounts
  useEffect(() => {
    const image = new window.Image()
    image.src = heroImage
    image.onload = () => {
      setIsImageLoaded(true)
    }
  }, [heroImage])

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      {/* Background image with overlay */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url('${heroImage}')` }}
      />

      {/* Dark overlay with subtle golden accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/60" />

      {/* Golden accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#cb8547]" />

      {/* Subtle diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #cb8547 0, #cb8547 1px, transparent 1px, transparent 15px)`,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative mx-auto h-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 z-10 flex flex-col justify-center items-center text-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
          }}
          className="w-full"
        >
          {/* Elegant badge */}
          <motion.div
            className="inline-block mb-8 px-5 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-[#cb8547]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <span className="text-[#cb8547] text-sm font-medium tracking-wider">
              ANDEGO GACHAGUA ADVOCATES
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight max-w-4xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
          >
            {heading}
          </motion.h1>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
          >
            <p className="text-lg md:text-xl mb-10 text-[#f0f1f0]/90 max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          </motion.div>

          {/* Centered golden divider */}
          <motion.div
            className="h-1 w-24 bg-[#cb8547] mx-auto my-8"
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: { width: 96, opacity: 1, transition: { duration: 0.8 } },
            }}
          />

          <motion.div
            className="flex flex-col sm:flex-row gap-5 mt-8 justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } },
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact-us"
                className="bg-[#cb8547] hover:bg-[#cb8547]/90 text-black px-6 sm:px-8 py-3 sm:py-4 text-base font-medium rounded-md shadow-lg flex items-center justify-center group transition-all duration-300 w-full"
              >
                Contact us today
                <motion.div className="ml-2" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <PhoneCall className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/practice-areas"
                className="border-2 border-[#f0f1f0] text-[#f0f1f0] hover:bg-[#f0f1f0]/10 px-6 sm:px-8 py-3 sm:py-4 text-base font-medium rounded-md transition-all duration-300 flex items-center justify-center"
              >
                Our practice areas
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      {/* Top right corner accent */}
      <motion.div
        className="absolute top-10 right-10 h-16 w-16 border border-[#cb8547]/30 rounded-full z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Bottom left corner accent */}
      <motion.div
        className="absolute bottom-20 left-10 h-24 w-24 border border-[#cb8547]/20 z-0"
        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.4, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  )
}
