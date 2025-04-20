import { Block } from 'payload'

export const HeroCards: Block = {
  slug: 'hero-cards', // Unique identifier for the block
  admin: { group: 'Home Page' },
  fields: [
    {
      name: 'cards',
      label: 'Hero Section Cards',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'title',
          label: 'Listing Title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Listing Content',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
