import React from 'react'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Andego Gachagua Advocates LLP',
  description:
    "We firmly believe in doing our work well, guided by a keen sense of professional integrity, trust and commercial awareness. This means that we apply our best efforts to provide excellent advice, to protect our clients' interests and to do that in a timely manner that does not affect other facets of our clients' personal/business affairs. After all, we understand that the legal aspect is but one of several other aspects you need to consider.",
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
