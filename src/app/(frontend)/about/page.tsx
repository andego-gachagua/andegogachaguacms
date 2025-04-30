export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import AboutHero from '@/components/aboutpage/AboutHero'
import WhyUsSection from '@/components/aboutpage/WhyUs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who We Are - Andego Gachagua Advocates LLP',
  description:
    'Learn about the vision, mission, and values that drive Andego Gachagua Advocates LLP. We are committed to delivering strategic, ethical, and client-centered legal solutions built on trust and excellence.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Who We Are - Andego Gachagua Advocates LLP',
    description:
      'Discover the story, principles, and commitment behind Andego Gachagua Advocates LLP. We champion our clients rights with integrity, strategic insight, and a relentless pursuit of legal excellence.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    images: [
      {
        url: '/logo1.png', // Consider using a branding or office image here if available
        width: 1200,
        height: 630,
        alt: 'Who We Are - Andego Gachagua Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'about' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <div className="">
      <div className="page">{page.layout?.map((block, index) => renderBlock(block, index))}</div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'about':
      return <AboutHero key={index} block={block} />
    case 'whyus':
      return <WhyUsSection key={index} block={block} />

    default:
      return null
  }
}
