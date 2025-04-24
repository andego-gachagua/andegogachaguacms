import { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact', // Unique identifier for the block
  admin: { group: 'Home Page' },

  fields: [
    {
      name: 'heading',
      label: 'Heading',
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
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
    {
      name: 'tel',
      label: 'Telephone Numbers',
      admin: {
        description: 'Add multiple telephone numbers',
      },
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'offices',
      label: 'Offices',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'physicalAddress',
          label: 'Physical Address',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sociallinks',
      label: 'Social Profiles',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
  ],
}
