import React from 'react'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Andego Gachagua Advocates LLP',
  description:
    'At Andego Gachagua Advocates LLP, we provide strategic, ethical, and results-driven legal services across diverse practice areas. Our client-centered approach empowers individuals and businesses with trusted guidance and clarity.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Andego Gachagua Advocates LLP - Strategic, Ethical, and Client-Focused Legal Solutions',
    description:
      'Discover how Andego Gachagua Advocates LLP delivers trusted, strategic, and client-centric legal solutions. Championing your rights with precision, integrity, and excellence.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Andego Gachagua Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
