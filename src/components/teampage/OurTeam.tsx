'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Filter,
  User,
  X,
  Mail,
  Phone,
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react'

interface OurTeamBlockProps {
  block: {
    attorney_profiles: Array<{
      id: number
      name: string
      slug: string
      role: string
      photo: {
        url: string
      }
      email?: string
      phone?: string
      sociallinks?: {
        linkedin: string
        facebook: string
        instagram: string
        twitter: string
      }
    }>
  }
}

export default function OurTeam({ block }: OurTeamBlockProps) {
  const mainColor = '#cb8547'
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  // Use provided attorneys from the block
  const attorneys = block.attorney_profiles

  // Extract unique roles for filtering
  const allRoles = useMemo(
    () => Array.from(new Set(attorneys.map((attorney) => attorney.role))),
    [attorneys],
  )

  // Filter attorneys based on search and role filters
  const filteredAttorneys = useMemo(
    () =>
      attorneys.filter((attorney) => {
        // Search filter
        const searchMatches =
          !searchTerm ||
          attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attorney.role.toLowerCase().includes(searchTerm.toLowerCase())

        // Role filter
        const roleMatches = selectedRoles.length === 0 || selectedRoles.includes(attorney.role)

        return searchMatches && roleMatches
      }),
    [attorneys, searchTerm, selectedRoles],
  )

  // Toggle role selection
  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRoles([])
    setSearchTerm('')
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="justify-center text-center p-12 bg-gradient-to-br from-gray-900 to-black md:mt-10">
        <div>
          <h2 className="text-white about_title">Our Team</h2>
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
                  <span className="ml-1 text-sm font-medium text-white md:ml-2">Our Team</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-20">
        {/* Search & Filter Bar */}
        <div
          className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between 
                        bg-[#f0f1f0] p-4 rounded-xl backdrop-blur-sm border border-gray-800"
        >
          <div className="w-full sm:w-auto relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 rounded-lg bg-[#cb8547] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-opacity-50 border border-gray-700"
              placeholder="Search attorneys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="border border-gray-700 hover:border-gray-600 transition-all text-white py-3 px-5 rounded-lg flex items-center gap-2 text-sm bg-[#cb8547] hover:bg-gray-800"
              style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Filter by Role'}
            </button>

            {(selectedRoles.length > 0 || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-gray-400 text-sm flex items-center gap-1 hover:text-white transition-colors py-2 px-3"
              >
                <X className="h-4 w-4" /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filters - Expandable */}
        {showFilters && (
          <div className="bg-[#f0f1f0] backdrop-blur-sm rounded-xl p-6 mb-10 border border-gray-800 animate-fadeIn">
            <h4 className="text-black font-medium mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-black" /> Filter by Role
            </h4>
            <div className="flex flex-wrap gap-3">
              {allRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleToggle(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedRoles.includes(role)
                      ? 'text-black'
                      : 'bg-[#cb8547] text-gray-300 hover:bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: selectedRoles.includes(role) ? mainColor : '',
                    boxShadow: selectedRoles.includes(role)
                      ? '0 2px 5px rgba(203, 133, 71, 0.3)'
                      : 'none',
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mb-8 text-gray-400 text-sm">
          Showing {filteredAttorneys.length}{' '}
          {filteredAttorneys.length === 1 ? 'attorney' : 'attorneys'}
          {(selectedRoles.length > 0 || searchTerm) && ' with applied filters'}
        </div>

        {/* Attorney Cards Grid */}
        {filteredAttorneys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttorneys.map((attorney) => (
              <div key={attorney.id} className="group">
                {/* Card with 3D effect */}
                <div
                  className="relative bg-gray-900 rounded-2xl overflow-hidden flex flex-col 
                               transition-all duration-300 border border-[#cb8547] shadow-sm hover:shadow-md
                               group-hover:border-gray-700 group-hover:shadow-lg"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden z-10">
                    <div
                      className="absolute top-0 right-0 w-40 h-40 transform rotate-45 translate-x-1/4 -translate-y-3/4"
                      style={{
                        background: `linear-gradient(135deg, ${mainColor} 0%, transparent 70%)`,
                        opacity: 0.3,
                      }}
                    ></div>
                  </div>

                  {/* Photo container with overlay */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      fill
                      src={attorney.photo?.url}
                      alt={attorney.name}
                      className="group-hover:scale-105 transition-transform duration-700 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* Social media links - positioned at top */}
                    {attorney.sociallinks && (
                      <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {attorney.sociallinks.linkedin && (
                          <a
                            href={attorney.sociallinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
                          >
                            <Linkedin size={16} style={{ color: mainColor }} />
                          </a>
                        )}
                        {attorney.sociallinks.facebook && (
                          <a
                            href={attorney.sociallinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
                          >
                            <Facebook size={16} style={{ color: mainColor }} />
                          </a>
                        )}
                        {attorney.sociallinks.instagram && (
                          <a
                            href={attorney.sociallinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
                          >
                            <Instagram size={16} style={{ color: mainColor }} />
                          </a>
                        )}
                        {attorney.sociallinks.twitter && (
                          <a
                            href={attorney.sociallinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
                          >
                            <Twitter size={16} style={{ color: mainColor }} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative p-6 flex flex-col flex-grow bg-gradient-to-br from-gray-900 to-black">
                    {/* Name and role with elegant styling */}
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold text-white mb-1">{attorney.name}</h3>
                      <div className="flex items-center">
                        <div
                          className="w-8 h-0.5 mr-3"
                          style={{ backgroundColor: mainColor }}
                        ></div>
                        <p className="text-gray-300 text-sm uppercase tracking-wider">
                          {attorney.role}
                        </p>
                      </div>
                    </div>

                    {/* Contact info and actions */}
                    <div className="mt-auto">
                      {/* Contact buttons in a more elegant row */}
                      <div className="flex items-center gap-4 mb-5">
                        {attorney.email && (
                          <a
                            href={`mailto:${attorney.email}`}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
                            aria-label={`Email ${attorney.name}`}
                            title={`Email ${attorney.name}`}
                          >
                            <span className="p-2 rounded-full bg-white group-hover:bg-white/80 transition-colors">
                              <Mail size={14} style={{ color: mainColor }} />
                            </span>
                            <span className="hidden sm:inline">Email</span>
                          </a>
                        )}
                        {attorney.phone && (
                          <a
                            href={`tel:${attorney.phone}`}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
                            aria-label={`Call ${attorney.name}`}
                            title={`Call ${attorney.name}`}
                          >
                            <span className="p-2 rounded-full bg-white group-hover:bg-white/80 transition-colors">
                              <Phone size={14} style={{ color: mainColor }} />
                            </span>
                            <span className="hidden sm:inline">Call</span>
                          </a>
                        )}
                      </div>

                      {/* Profile button with arrow */}
                      <Link
                        href={`/our-team/${attorney.slug}`}
                        className="inline-flex items-center justify-center w-full py-3 px-4 text-sm font-medium rounded-lg transition-all"
                        style={{
                          backgroundColor: 'rgba(203, 133, 71, 0.15)',
                          color: mainColor,
                          border: `1px solid ${mainColor}`,
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = mainColor
                          e.currentTarget.style.color = 'black'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(203, 133, 71, 0.15)'
                          e.currentTarget.style.color = mainColor
                        }}
                      >
                        View Full Profile
                        <ChevronRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white py-16 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
            <p className="text-xl mb-3">No attorneys found matching your criteria</p>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="py-3 px-6 border border-gray-700 hover:border-gray-600 transition-colors rounded-lg text-white bg-gray-800/70 hover:bg-gray-800"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
