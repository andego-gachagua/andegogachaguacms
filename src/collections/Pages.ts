import { Hero } from '@/blocks/homepage/hero/schema'
import { HeroCards } from '@/blocks/homepage/hero-cards/schema'
import { LandingAbout } from '@/blocks/homepage/home-about/schema'
import { ServicesBlock } from '@/blocks/homepage/services/schema'
import { OurTeam } from '@/blocks/homepage/our-team/schema'
import { CTA } from '@/blocks/homepage/cta/schema'
import { Contact } from '@/blocks/homepage/contact-us/schema'
import type { CollectionConfig } from 'payload'
import { About, WhyUs } from '@/blocks/about/schema'
import { PracticeAreasBlock } from '@/blocks/practiceareas/schema'
import { OfficeDetails } from '@/blocks/office/schema'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [
        Hero,
        HeroCards,
        LandingAbout,
        ServicesBlock,
        OurTeam,
        CTA,
        Contact,
        About,
        WhyUs,
        PracticeAreasBlock,
        OfficeDetails,
      ],
    },
  ],
}
