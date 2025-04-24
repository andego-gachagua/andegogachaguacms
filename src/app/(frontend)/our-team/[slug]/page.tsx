export const dynamic = 'force-dynamic'

import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  Mail,
  GraduationCap,
  Globe,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
} from 'lucide-react'
import { fetchAllMembers, fetchRelatedMembers } from '@/lib/ourTeamUtils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@/components/RichText'

export default async function TeamDescription({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const team_member = docs[0]
  if (!team_member) {
    notFound()
  }

  const relatedMembers = await fetchRelatedMembers(slug)
  const mainColor = '#cb8547'

  return (
    <section className="py-20 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      {/* Top accent element */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden z-0">
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{
            background: `linear-gradient(180deg, black 0%, transparent 100%)`,
            opacity: 0.8,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Navigation */}
        <Link
          href="/our-team"
          className="inline-flex items-center text-gray-700 hover:text-black mb-12 font-medium transition-colors group"
        >
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 mr-3 transition-colors">
            <ArrowLeft className="w-4 h-4" style={{ color: mainColor }} />
          </div>
          Back to Our Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Photo & Contact Info */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
              style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
            >
              {/* Photo */}
              <div className="relative h-96 w-full overflow-hidden">
                {team_member.photo ? (
                  <Image
                    src={
                      typeof team_member.photo === 'object' &&
                      'url' in team_member.photo &&
                      team_member.photo.url
                        ? team_member.photo.url
                        : '/bg.jpg'
                    }
                    alt={team_member.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Contact Information */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{team_member.name}</h1>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-0.5 mr-3" style={{ backgroundColor: mainColor }}></div>
                  <p
                    className="text-sm uppercase tracking-wider font-medium"
                    style={{ color: mainColor }}
                  >
                    {team_member.role}
                  </p>
                </div>

                <div className="space-y-5 mt-8">
                  {team_member.email && (
                    <a
                      href={`mailto:${team_member.email}`}
                      className="flex items-center text-gray-700 hover:text-black transition-colors group"
                    >
                      <span className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 mr-4 transition-colors">
                        <Mail size={18} style={{ color: mainColor }} />
                      </span>
                      <span>{team_member.email}</span>
                    </a>
                  )}
                  {team_member.phone && (
                    <a
                      href={`tel:${team_member.phone}`}
                      className="flex items-center text-gray-700 hover:text-black transition-colors group"
                    >
                      <span className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 mr-4 transition-colors">
                        <Phone size={18} style={{ color: mainColor }} />
                      </span>
                      <span>{team_member.phone}</span>
                    </a>
                  )}
                  {/* Languages */}
                  {team_member.languages && team_member.languages.length > 0 && (
                    <div className="flex items-start">
                      <span className="p-2 rounded-full bg-gray-100 mr-4 flex-shrink-0 mt-1">
                        <Globe size={18} style={{ color: mainColor }} />
                      </span>
                      <div>
                        <p className="text-gray-900 font-medium mb-2">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {team_member.languages.map((language) => (
                            <span
                              key={language.id}
                              className="px-3 py-1 text-sm rounded-md"
                              style={{
                                backgroundColor: 'rgba(203, 133, 71, 0.1)',
                                color: mainColor,
                                border: `1px solid ${mainColor}`,
                              }}
                            >
                              {language.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Social Links */}
                  {team_member.sociallinks && (
                    <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-gray-200">
                      {team_member.sociallinks.linkedin && (
                        <a
                          href={team_member.sociallinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin size={18} style={{ color: mainColor }} />
                        </a>
                      )}
                      {team_member.sociallinks.facebook && (
                        <a
                          href={team_member.sociallinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Facebook Profile"
                        >
                          <Facebook size={18} style={{ color: mainColor }} />
                        </a>
                      )}
                      {team_member.sociallinks.instagram && (
                        <a
                          href={team_member.sociallinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Instagram Profile"
                        >
                          <Instagram size={18} style={{ color: mainColor }} />
                        </a>
                      )}
                      {team_member.sociallinks.twitter && (
                        <a
                          href={team_member.sociallinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Twitter Profile"
                        >
                          <Twitter size={18} style={{ color: mainColor }} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Education Box */}
            {team_member.education && team_member.education.length > 0 && (
              <div
                className="mt-8 bg-white rounded-2xl overflow-hidden p-8 border border-gray-200 shadow-lg"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
              >
                <div className="flex items-center mb-6">
                  <span className="p-2 rounded-full bg-gray-100 mr-3">
                    <GraduationCap size={18} style={{ color: mainColor }} />
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Education</h2>
                </div>
                <ul className="space-y-4">
                  {team_member.education.map((edu) => (
                    <li key={edu.id} className="flex items-start">
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: mainColor }}
                      ></div>
                      <p className="text-gray-700">{edu.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Bio & Related Team */}
          <div className="lg:col-span-2">
            {/* Bio */}
            <div
              className="bg-white rounded-2xl overflow-hidden p-8 mb-10 border border-gray-200 shadow-lg"
              style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Biography</h2>

              {team_member.bio ? (
                <div className="prose max-w-none text-gray-700">
                  <RichText data={team_member.bio} />
                </div>
              ) : (
                <p className="text-gray-500 italic">No biography available.</p>
              )}
            </div>

            {/* Related Team Members */}
            {relatedMembers && relatedMembers.length > 0 && (
              <div
                className="bg-white rounded-2xl overflow-hidden p-8 border border-gray-200 shadow-lg"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
              >
                <div className="mb-6">
                  <span
                    className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-2"
                    style={{ backgroundColor: 'rgba(203, 133, 71, 0.2)', color: mainColor }}
                  >
                    Meet Our Team
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">Other Attorneys</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedMembers.slice(0, 4).map((member) => (
                    <Link href={`/our-team/${member.slug}`} key={member.id} className="group">
                      <div
                        className="flex items-center p-4 rounded-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 hover:shadow-md"
                        style={{
                          background: 'linear-gradient(to right, white, rgba(203, 133, 71, 0.05))',
                        }}
                      >
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-md">
                          {member.photo ? (
                            <Image
                              src={
                                typeof member.photo === 'object' &&
                                'url' in member.photo &&
                                member.photo.url
                                  ? member.photo.url
                                  : '/bg.jpg'
                              }
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <span className="text-xs text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-bold text-gray-900 group-hover:text-black transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={18} style={{ color: mainColor }} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {relatedMembers.length > 4 && (
                  <div className="mt-8 text-center">
                    <Link
                      href="/our-team"
                      className="inline-flex items-center justify-center py-3 px-6 text-sm font-medium rounded-lg transition-all"
                      style={{
                        backgroundColor: 'rgba(203, 133, 71, 0.15)',
                        color: mainColor,
                        border: `1px solid ${mainColor}`,
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = mainColor
                        e.currentTarget.style.color = 'white'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(203, 133, 71, 0.15)'
                        e.currentTarget.style.color = mainColor
                      }}
                    >
                      View All Team Members
                      <ChevronRight size={16} className="ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent element */}
      <div className="absolute bottom-0 right-0 w-full h-48 overflow-hidden z-0">
        <div
          className="absolute -right-1/4 bottom-0 w-1/2 h-full opacity-5 transform rotate-12"
          style={{ background: `linear-gradient(45deg, ${mainColor} 0%, transparent 70%)` }}
        ></div>
      </div>
    </section>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const teamMembers = await fetchAllMembers()
    return teamMembers.map((member) => ({
      slug: String(member.slug),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
