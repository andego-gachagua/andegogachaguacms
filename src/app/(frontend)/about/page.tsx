export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import AboutHero from '@/components/aboutpage/AboutHero'
import WhyUsSection from '@/components/aboutpage/WhyUs'
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
