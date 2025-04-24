'use client'
import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'
import ContactForm from '../contactPage/ContactSection'
import Link from 'next/link'

interface HeroBlockProps {
  block: {
    heading: string
    description: string
    email: string
    tel: {
      phone: number
    }[]
    offices: {
      id: number
      physicalAddress: string
    }[]
    sociallinks: {
      linkedin: string
      twitter: string
      facebook: string
      instagram: string
    }
  }
}

export default function ContactHome({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.heading || "Let's Connect"
  const description =
    block?.description ||
    "Have a question or need assistance? We're here to help you every step of the way."
  const email = block?.email || 'hello@company.com'
  const socials = block?.sociallinks || {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
    instagram: '#',
  }

  return (
    <section className="relative py-20 bg-gradient-to-b md:bg-gradient-to-br from-[#cb8547] via-black to-[#ffbb7f] overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-10 -top-10 w-64 h-64 rounded-full bg-purple-400"></div>
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-blue-400"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-indigo-400"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
          {/* Contact Form Side - LEFT */}
          <div className="w-full lg:w-7/12 bg-white rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none p-8 md:p-12">
            <ContactForm />
          </div>

          {/* Contact Info Side - RIGHT */}
          <div className="w-full lg:w-5/12 bg-gradient-to-br from-black to-[#cb8547] text-white p-8 md:p-12">
            <div className="h-full flex flex-col">
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">{heading}</h3>
                <p className="text-indigo-100">{description}</p>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#cb8547] bg-opacity-40">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white mb-2">Email</h4>
                    <a href={`mailto:${email}`} className="text-white transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#cb8547] bg-opacity-40">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white mb-2">Phone</h4>
                    {block.tel?.map((item, index) => (
                      <Link
                        key={index}
                        href={`tel:${item.phone}`}
                        className="block text-white transition-colors"
                      >
                        {item.phone}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#cb8547] bg-opacity-40">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white mb-2">Visit Us</h4>
                    {block.offices?.map((item) => (
                      <p key={item.id} className="text-white mb-2">
                        {item.physicalAddress}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="text-lg font-medium text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href={socials.linkedin}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={socials.twitter}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={socials.facebook}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={socials.instagram}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
