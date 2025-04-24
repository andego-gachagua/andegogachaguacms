import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  admin: { group: 'About Page' },
  fields: [
    { name: 'clause', type: 'textarea', required: true },
    { name: 'photo', label: 'Firm Photo', type: 'upload', relationTo: 'media', required: true },
  ],
}

export const WhyUs: Block = {
  slug: 'whyus',
  admin: { group: 'About Page' },
  labels: {
    singular: 'Why Us',
    plural: 'Why Us',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },

    {
      name: 'cases_closed',
      type: 'group',
      fields: [
        { name: 'case', label: 'Section Heading', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
      ],
    },
    {
      name: 'advocates',
      type: 'group',
      fields: [
        { name: 'advocate', label: 'Section Heading', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
      ],
    },
    {
      name: 'clients',
      type: 'group',
      fields: [
        { name: 'client', label: 'Section Heading', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
      ],
    },
    {
      name: 'successful_cases',
      type: 'group',
      fields: [
        { name: 'cases', label: 'Section Heading', type: 'text', required: true },
        { name: 'value', type: 'number', required: true },
      ],
    },
  ],
}
