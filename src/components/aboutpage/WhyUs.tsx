'use client'
import React, { useState, useEffect } from 'react'
import { Target, Award, Users, Scale, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface WhyblockProps {
  block: {
    heading: string
    description: string
    cases_closed: {
      case: string
      value: number
    }
    advocates: {
      advocate: string
      value: number
    }
    clients: {
      client: string
      value: number
    }
    successful_cases: {
      cases: string
      value: number
    }
  }
}

export default function WhyUsSection({ block }: WhyblockProps) {
  const mainColor = '#cb8547'
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    cases: 0,
    advocates: 0,
    clients: 0,
    successful: 0,
  })

  // Animation for stat counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const section = document.getElementById('why-us-section')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  // Counter animation effect
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const interval = 20 // update every 20ms
    const steps = duration / interval

    const targetValues = {
      cases: block.cases_closed.value,
      advocates: block.advocates.value,
      clients: block.clients.value,
      successful: block.successful_cases.value,
    }

    const stepValues = {
      cases: targetValues.cases / steps,
      advocates: targetValues.advocates / steps,
      clients: targetValues.clients / steps,
      successful: targetValues.successful / steps,
    }

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++

      setCounters({
        cases: Math.min(Math.round(stepValues.cases * currentStep), targetValues.cases),
        advocates: Math.min(Math.round(stepValues.advocates * currentStep), targetValues.advocates),
        clients: Math.min(Math.round(stepValues.clients * currentStep), targetValues.clients),
        successful: Math.min(
          Math.round(stepValues.successful * currentStep),
          targetValues.successful,
        ),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, block])

  return (
    <section id="why-us-section" className="py-20 bg-[#311d0c] text-white relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10 pt-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mission Card */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h2 className="text-4xl font-bold mb-4">
                <span className="relative">
                  {block.heading}
                  <span
                    className="absolute -bottom-2 left-0 w-24 h-1"
                    style={{ backgroundColor: mainColor }}
                  ></span>
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed mt-6 text-base">{block.description}</p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 hover:bg-opacity-90"
                style={{ backgroundColor: mainColor }}
              >
                Schedule a Consultation
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cases Closed */}
            <div className="p-6 rounded-lg border border-white transition-transform hover:translate-y-[-5px] bg-transparent">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(203, 133, 71, 0.2)' }}
                >
                  <Scale size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-5xl font-bold mb-2" style={{ color: mainColor }}>
                  {counters.cases}+
                </h3>
                <p className="text-gray-400">{block.cases_closed.case}</p>
              </div>
            </div>

            {/* Advocates */}
            <div className="p-6 rounded-lg border border-white transition-transform hover:translate-y-[-5px] bg-transparent">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(203, 133, 71, 0.2)' }}
                >
                  <Award size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-5xl font-bold mb-2" style={{ color: mainColor }}>
                  {counters.advocates}+
                </h3>
                <p className="text-gray-400">{block.advocates.advocate}</p>
              </div>
            </div>

            {/* Clients */}
            <div className="p-6 rounded-lg border border-white transition-transform hover:translate-y-[-5px] bg-transparent">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(203, 133, 71, 0.2)' }}
                >
                  <Users size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-5xl font-bold mb-2" style={{ color: mainColor }}>
                  {counters.clients}+
                </h3>
                <p className="text-gray-400">{block.clients.client}</p>
              </div>
            </div>

            {/* Successful Cases */}
            <div className="p-6 rounded-lg border border-white transition-transform hover:translate-y-[-5px] bg-transparent">
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(203, 133, 71, 0.2)' }}
                >
                  <Target size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-5xl font-bold mb-2" style={{ color: mainColor }}>
                  {counters.successful}+
                </h3>
                <p className="text-gray-400">{block.successful_cases.cases}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
