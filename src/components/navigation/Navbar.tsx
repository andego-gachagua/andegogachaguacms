'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-[#cb8547] ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-5'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/main.png"
              width={130}
              height={50}
              alt="Andego Gachagua Logo"
              className="w-24 md:w-32"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex space-x-8 items-center font-medium text-gray-700">
            <li>
              <Link
                href="/"
                className="hover:text-black transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-black"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-black transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-black"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/our-team"
                className="hover:text-black transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-black"
              >
                Our Team
              </Link>
            </li>
            <li>
              <Link
                href="/practice-areas"
                className="hover:text-black transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-black"
              >
                Practice Areas
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-black transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-black"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Book Appointment Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="bg-gradient-to-br from-gray-900 to-black text-white hover:bg-gray-800 font-medium px-6 py-2 rounded-md transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={handleNav}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <IoClose size={26} className="text-gray-800" />
          ) : (
            <FiMenu size={26} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleNav}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 md:hidden transition-transform duration-300 ease-in-out shadow-xl ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={handleNav}
            className="text-gray-700 hover:text-black"
            aria-label="Close menu"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="px-4 py-6">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/main.png"
              width={120}
              height={40}
              alt="Andego Gachagua Logo"
              className="w-32"
            />
          </div>

          {/* Mobile Navigation Links */}
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block w-full py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={handleNav}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block w-full py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={handleNav}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/our-team"
                className="block w-full py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={handleNav}
              >
                Our Team
              </Link>
            </li>
            <li>
              <Link
                href="/practice-areas"
                className="block w-full py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={handleNav}
              >
                Practice Areas
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block w-full py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={handleNav}
              >
                Blog{' '}
              </Link>
            </li>
          </ul>

          {/* Mobile Book Appointment Button */}
          <div className="mt-8 px-4">
            <Link
              href="/contact"
              className="block w-full bg-black text-white text-center font-medium py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
              onClick={handleNav}
            >
              Contact Us{' '}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
