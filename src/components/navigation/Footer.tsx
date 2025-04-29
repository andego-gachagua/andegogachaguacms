'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Reset notification states
    setSubscribed(false)
    setAlreadySubscribed(false)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Show already subscribed notification instead of alert
        setAlreadySubscribed(true)
        setTimeout(() => setAlreadySubscribed(false), 5000)
      } else if (res.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        alert(data.error || 'Something went wrong. Please try again later.')
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again later.')
      console.error(error)
    }
  }

  return (
    <footer className="bg-[#f0f1f0] px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 mb-12">
          {/* Logo and tagline */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <Image
                src="/logo.png"
                width={45}
                height={45}
                alt="Andego Gachagua"
                className="logo"
              />
              <span className="ml-3 font-bold tracking-wide text-gray-800 text-lg md:text-xl">
                <span className="block">Andego Gachagua</span>
                <span className="block text-sm md:text-base text-[#cb8547]">Advocates LLP</span>
              </span>
            </Link>
            <div className="mt-6">
              <p className="text-gray-700 text-sm md:text-base">
                We firmly believe in doing our work well, guided by a keen sense of professional
                integrity, trust and commercial awareness.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-[#cb8547] mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-[#cb8547] transition-colors text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/practice_areas"
                  className="text-gray-700 hover:text-[#cb8547] transition-colors text-sm md:text-base"
                >
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-[#cb8547] transition-colors text-sm md:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-[#cb8547] transition-colors text-sm md:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-[#cb8547] mb-4 text-lg">Contact Us</h3>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#cb8547] mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <Link
                    href="tel:+254759803001"
                    className="text-gray-700 hover:text-[#cb8547] transition-colors"
                  >
                    +254 759 803001
                  </Link>
                  <br />
                  <Link
                    href="tel:+254704208484"
                    className="text-gray-700 hover:text-[#cb8547] transition-colors"
                  >
                    +254 704 208484
                  </Link>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#cb8547] mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <Link
                  href="mailto:info@andegogachagua.com"
                  className="text-gray-700 hover:text-[#cb8547] transition-colors"
                >
                  info@andegogachagua.com
                </Link>
              </div>
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#cb8547] mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="text-gray-700">
                  <p className="mb-2">
                    Madonna House, 3rd Floor, Suite 314 and 315 Westlands Rd, Westlands
                  </p>
                  <p>Adala Otuko Road, Behind St.Joseph{"'"}s Catholic Church, Milimani, Kisumu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter subscription - NEW SECTION */}
          <div className="lg:col-span-4">
            <h3 className="font-semibold text-[#cb8547] mb-4 text-lg">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              Stay updated with our latest legal insights, news, and firm updates.
            </p>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cb8547] focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#cb8547] text-white px-4 py-3 rounded-md hover:bg-[#b67338] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>

              {/* Success notification */}
              {subscribed && (
                <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md text-sm">
                  Thank you for subscribing to our newsletter!
                </div>
              )}

              {/* Already subscribed notification */}
              {alreadySubscribed && (
                <div className="mt-2 p-2 bg-blue-100 text-blue-700 rounded-md text-sm">
                  This email is already subscribed to our newsletter.
                </div>
              )}
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3 text-base">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="/"
                  aria-label="Twitter"
                  className="bg-white p-2 rounded-full text-[#cb8547] hover:bg-[#cb8547] hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                  </svg>
                </Link>
                <Link
                  href="/"
                  aria-label="Instagram"
                  className="bg-white p-2 rounded-full text-[#cb8547] hover:bg-[#cb8547] hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 30 30" fill="currentColor" className="h-5 w-5">
                    <circle cx="15" cy="15" r="4" />
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                  </svg>
                </Link>
                <Link
                  href="/"
                  aria-label="Facebook"
                  className="bg-white p-2 rounded-full text-[#cb8547] hover:bg-[#cb8547] hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                  </svg>
                </Link>
                <Link
                  href="/"
                  aria-label="LinkedIn"
                  className="bg-white p-2 rounded-full text-[#cb8547] hover:bg-[#cb8547] hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - copyright and links */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex justify-center items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Andego Gachagua Advocates LLP. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
