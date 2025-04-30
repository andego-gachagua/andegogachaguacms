import React from 'react'
import ContactPage from '@/components/contactPage/ContactPage'
import ContactHero from '@/components/contactPage/ContactHero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Andego Gachagua Advocates LLP',
  description:
    'Get in touch with Andego Gachagua Advocates LLP for trusted legal advice and personalized service. We are here to support you with strategic, ethical, and client-focused legal solutions.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Contact Us - Andego Gachagua Advocates LLP',
    description:
      'Reach out to Andego Gachagua Advocates LLP to discuss your legal needs. Our team offers strategic, ethical, and client-focused legal representation you can trust.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact Andego Gachagua Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  },
}

export default function page() {
  return (
    <>
      <ContactHero />
      <ContactPage />
    </>
  )
}
