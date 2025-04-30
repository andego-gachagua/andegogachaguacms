export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import OurTeam from '@/components/teampage/OurTeam'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team - Andego Gachagua Advocates LLP',
  description:
    'Meet the accomplished legal team at Andego Gachagua Advocates LLP. Our advocates and legal professionals are committed to delivering strategic, ethical, and client-focused legal solutions.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Our Team - Andego Gachagua Advocates LLP',
    description:
      'Get to know the skilled and trusted professionals at Andego Gachagua Advocates LLP. Our team is dedicated to offering expert legal counsel and strategic insight tailored to our clients needs.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/our-team`,
    images: [
      {
        url: '/logo1.png',
        width: 1200,
        height: 630,
        alt: 'Our Team - Andego Gachagua Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/our-team`,
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
      slug: { equals: 'our-team' },
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
    case 'our-team':
      return <OurTeam key={index} block={block} />

    default:
      return null
  }
}
