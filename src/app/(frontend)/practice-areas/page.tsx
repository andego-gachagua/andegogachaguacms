export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'
import PracticeHeroSection from '@/components/practiceAreas/PracticeHero'

import config from '@/payload.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice Areas - Andego Gachagua Advocates LLP',
  description:
    'Explore the diverse legal practice areas of Andego Gachagua Advocates LLP. We offer strategic, ethical, and client-focused legal solutions across various fields to empower informed decision-making.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Practice Areas - Andego Gachagua Advocates LLP',
    description:
      'Learn more about the comprehensive legal services offered by Andego Gachagua Advocates LLP. Our team is dedicated to delivering tailored, results-driven solutions across multiple practice areas.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/practice-areas`,
    images: [
      {
        url: '/logo1.png', // You may replace with a relevant image for practice areas if needed
        width: 1200,
        height: 630,
        alt: 'Practice Areas - Andego Gachagua Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/practice-areas`,
  },
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'practice-areas' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <div>
      <div className="page">{page.layout?.map((block, index) => renderBlock(block, index))}</div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'practice-areas-block':
      return <PracticeHeroSection key={index} block={block} />
    default:
      return null
  }
}
